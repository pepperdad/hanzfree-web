export async function callShopifyAdmin(query: any, variables = {}) {
  const fetchUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/admin/api/2023-07/graphql.json`;

  const fetchOptions = {
    // endpoint: fetchUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.NEXT_PUBLIC_STORE_ADMIN_ACCESS!,
    },
    body: JSON.stringify({ query, variables }),
  };

  try {
    const data = await fetch(fetchUrl, fetchOptions).then((response) => response.json());

    // console.log('data', data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Could not fetch products!');
  }
}

export async function callShopifyFront(query: any, variables = {}) {
  const fetchUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2023-07/graphql.json`;

  const fetchOptions = {
    // endpoint: fetchUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_STORE_FRONT_ACCESS!,
    },
    body: JSON.stringify({ query, variables }),
  };

  try {
    const data = await fetch(fetchUrl, fetchOptions).then((response) => response.json());

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Could not fetch products!');
  }
}

const gql = String.raw;

export const AllProducts = gql`
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            edges {
              node {
                url
                width
                height
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const Slugs = gql`
  query ProductSlugs {
    products(first: 22) {
      edges {
        node {
          id
          handle
        }
      }
    }
  }
`;

export const singleProduct = gql`
  query ProductDetails($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      images(first: 10) {
        edges {
          node {
            url
            width
            height
          }
        }
      }
      priceRange {
        maxVariantPrice {
          amount
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

export const createCheckout = gql`
  mutation CreateCheckout($variantId: ID!, $quantity: Int!) {
    checkoutCreate(input: { lineItems: [{ variantId: $variantId, quantity: $quantity }] }) {
      checkout {
        webUrl
      }
    }
  }
`;
