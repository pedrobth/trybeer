const { getProductsData } = require('../models/productModels');
const { registerPurchase, registerPurchaseProducts } = require('../models/salesModels');
const statusMsgMap = require('./dictionaries/statusMsgMap');

const preCheckFields = (requiredFields, inputs) => {
  if (!requiredFields.every((f) => inputs.every((inp) => inp[f]))) return false;
  if (Object.values(inputs).some((v) => v.length === 0 || v.length > 127)) return false;
  if (!inputs.every((i) => Object.values(i))) return false;
  return true;
};

const validateLengths = (number, streetAddress) => {
  if (number.length < 1 || number.length > 124) return false;
  if (streetAddress.length < 4 || streetAddress.length > 124) return false;
  return true;
};

const validateStrFields = (nbr, street) => {
  if (!nbr || !street) return false;
  if (!validateLengths(nbr, street)) return false;
  return true;
};

const validateSale = (saleData, hNbr, street, user) => {
  const mandatoryPdtFields = ['id', 'name', 'price', 'quantity'];
  const mandatoryUserField = ['id'];
  if (!validateStrFields(hNbr, street)) return false;
  return !preCheckFields(mandatoryPdtFields, saleData)
    ? false
    : preCheckFields(mandatoryUserField, [user]);
};

const insertPurchase = async (purchase, pdtList) => {
  const [insertPurchRes] = await registerPurchase(purchase);
  if (insertPurchRes.err) return false;
  const { insertId } = insertPurchRes;
  const insertPurchPdtsRes = await registerPurchaseProducts(pdtList, insertId);
  const allInserted = insertPurchPdtsRes
    .find((insertion) => insertion[0].affectedRows !== 1);
  if (insertPurchPdtsRes.err || allInserted) return false;
  return { insertId, statusCode: statusMsgMap.created.status };
};

const formatInfo = (pdts, { userId, street, houseNumber, totalPrice }) => {
  const { status } = pdts;
  const date = new Date();
  const trustedDate = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
  return {
    userId,
    deliveryAddress: street,
    deliveryNumber: houseNumber,
    status: status || 'Pendente',
    totalPrice,
    trustedDate,
  };
};

const checkoutServ = async (body, user) => {
  try {
    const { cart, street, houseNumber } = body;
    if (!validateSale(cart, houseNumber, street, user)) return statusMsgMap.allFieldsMustBeFilled;
    const productsIds = cart.map((product) => product.id);
    const productsData = await getProductsData(productsIds);
    const totalPrice = productsData
      .reduce((acc, p, i) => acc + (p.price * cart[i].quantity), 0).toFixed(2);
    const purchInfo = { userId: user.id, street, houseNumber, totalPrice };
    const formatedData = formatInfo(cart, purchInfo);
    const { trustedDate } = formatedData;
    const insertionRes = await insertPurchase(formatedData, cart);
    if (!insertionRes) return statusMsgMap.erorInDb;
    const { insertId, statusCode } = insertionRes;
    return { message: { insertId, trustedDate }, status: statusCode };
  } catch (err) {
    console.log('error: ', err);
    return (err);
  }
};

module.exports = checkoutServ;
