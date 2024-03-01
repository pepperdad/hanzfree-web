import { callShopifyFront, createCheckout } from './shopify';

export default async function Subscribe(req: any, res: any) {
  const { variantId, quantity } = req.body;

  try {
    const response = await callShopifyFront(createCheckout, {
      variantId,
      quantity,
    });

    let { webUrl } = response.data.checkoutCreate.checkout;

    webUrl = webUrl.replace('c106ee-24', 'hanzfree-payment');

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error generating the checkoutURL. Please try again.`,
      });
    }
    return res.status(201).json({ checkoutURL: webUrl });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      error: `There was an error generating the checkoutURL. Please try again.`,
    });
  }
}
