/**
 * WhatsApp Utility for CEYO CLOTHING
 * Business WhatsApp Number: +94773129477
 */

export const BUSINESS_WHATSAPP_NUMBER = '+94773129477';
export const BUSINESS_WHATSAPP_CLEAN = '94773129477';

export interface SingleProductOrderParams {
  customerName: string;
  customerPhone: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  deliveryAddress: string;
  totalAmountLKR: number;
  city?: string;
  notes?: string;
}

export interface MultiItemOrderParams {
  customerName: string;
  customerPhone: string;
  items: Array<{
    productName: string;
    size: string;
    color: string;
    quantity: number;
    priceLKR: number;
  }>;
  deliveryAddress: string;
  totalAmountLKR: number;
  city?: string;
  notes?: string;
}

/**
 * Format single product order message strictly matching user requirements:
 * - Customer name
 * - Customer phone number
 * - Product name
 * - Size
 * - Color
 * - Quantity
 * - Delivery address
 * - Total amount in LKR
 */
export function formatSingleOrderMessage(order: SingleProductOrderParams): string {
  const fullAddress = order.city
    ? `${order.deliveryAddress.trim()}, ${order.city.trim()}`
    : order.deliveryAddress.trim();

  let message = `*NEW ORDER - CEYO CLOTHING*
----------------------------------------
*Customer Name:* ${order.customerName.trim()}
*Customer Phone Number:* ${order.customerPhone.trim()}
*Product Name:* ${order.productName}
*Size:* ${order.size}
*Color:* ${order.color}
*Quantity:* ${order.quantity}
*Delivery Address:* ${fullAddress}
*Total Amount:* Rs. ${order.totalAmountLKR.toLocaleString()} LKR
----------------------------------------`;

  if (order.notes && order.notes.trim()) {
    message += `\n*Special Instructions:* ${order.notes.trim()}\n----------------------------------------`;
  }

  message += `\n_Order placed via CEYO CLOTHING Official Website._\n_Please confirm stock availability & payment method (COD / Bank Transfer)._`;

  return message;
}

/**
 * Format multi-item cart order message
 */
export function formatMultiItemOrderMessage(order: MultiItemOrderParams): string {
  const fullAddress = order.city
    ? `${order.deliveryAddress.trim()}, ${order.city.trim()}`
    : order.deliveryAddress.trim();

  const productNamesFormatted = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.productName} (Size: ${item.size}, Color: ${item.color}, Qty: ${item.quantity} × Rs. ${item.priceLKR.toLocaleString()})`
    )
    .join('\n');

  const allSizes = order.items.map((i) => `${i.productName}: ${i.size}`).join(', ');
  const allColors = order.items.map((i) => `${i.productName}: ${i.color}`).join(', ');
  const totalQty = order.items.reduce((sum, i) => sum + i.quantity, 0);

  let message = `*NEW ORDER - CEYO CLOTHING*
----------------------------------------
*Customer Name:* ${order.customerName.trim()}
*Customer Phone Number:* ${order.customerPhone.trim()}

*Products Ordered:*
${productNamesFormatted}

*Sizes:* ${allSizes}
*Colors:* ${allColors}
*Total Quantity:* ${totalQty} items
*Delivery Address:* ${fullAddress}
*Total Amount:* Rs. ${order.totalAmountLKR.toLocaleString()} LKR
----------------------------------------`;

  if (order.notes && order.notes.trim()) {
    message += `\n*Special Instructions:* ${order.notes.trim()}\n----------------------------------------`;
  }

  message += `\n_Order placed via CEYO CLOTHING Official Website._\n_Please confirm stock availability & delivery schedule._`;

  return message;
}

/**
 * Build WhatsApp Web/App URL for pre-filled chat
 */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_WHATSAPP_CLEAN}?text=${encodeURIComponent(message)}`;
}

/**
 * General customer enquiry URL
 */
export function buildGeneralEnquiryUrl(subject?: string): string {
  const text = subject
    ? `Hello CEYO CLOTHING team, I have a question regarding: ${subject}`
    : `Hello CEYO CLOTHING team, I would like to inquire about your collections and availability.`;
  return `https://wa.me/${BUSINESS_WHATSAPP_CLEAN}?text=${encodeURIComponent(text)}`;
}
