import type { APIRoute } from 'astro';
import { SITE_URL, BIZ } from '../consts';
import { getPosts, postPath } from '../posts';

// /llms.txt — plain-text summary of the business for AI assistants (llmstxt.org format).
// Facts come from src/consts.ts and the blog collection, so this file never drifts from the site.
// Only state things the site itself states. No prices, lead times or claims we cannot back up.
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const address = `${BIZ.street}, ${BIZ.city}, ${BIZ.region} ${BIZ.zip}`;

  const blogLines = posts.length
    ? posts.map((p) => `- [${p.data.title}](${SITE_URL}${postPath(p.id)}): ${p.data.description}`).join('\n')
    : '- No articles published yet.';

  const body = `# ${BIZ.name}

> ${BIZ.shortName} is a kitchen and bath cabinet showroom at ${address}. It sells kitchen cabinets, bathroom vanities, closets and countertops, offers a free 3D design with a written quote, lends full-size door samples to take home, and installs through a Virginia-licensed partner across Hampton Roads, Virginia.

${BIZ.shortName} is a trade name of ${BIZ.legalName}.

## Contact and location

- Showroom: ${address}
- Phone (call or text): ${BIZ.phoneDisplay}
- Email: ${BIZ.email}
- Hours: Monday to Saturday, 9 am to 6 pm. Closed Sunday.
- Directions: ${BIZ.mapsUrl}
- Website: ${SITE_URL}/
- Instagram: ${BIZ.instagram}
- Service area: ${BIZ.cities.join(', ')} (Virginia). Measuring and installation across the Southside and the Peninsula.

## Products and services

- Kitchen cabinets: shaker, slab and raised-panel lines, from one wall to a full island kitchen.
- Bathroom vanities: single and double vanities, with tops, mirrors and linen towers to match.
- Countertops: quartz, granite and butcher block, templated after the cabinets are set.
- Closets and pantries: walk-in closets, pantry walls and built-in storage.
- Installation: by a Virginia-licensed installation partner, with a 1-year installation warranty.
- Full remodels: tile, plumbing and electrical through licensed partners.
- Customers can buy cabinets only (pickup at the Norfolk showroom or delivery) or choose full installation.

## Door styles

- Shaker: five-piece door with a flat recessed center panel. The most requested style.
- Slab: flat, frameless and modern. Pairs well with long bar pulls.
- Raised panel: a traditional profile for classic and colonial homes.
- Glass front: shaker frame with a glass insert, for uppers and display cabinets.

## Best-selling colors (in stock)

- Hydra: a soft water green with a calm, coastal feel. Best seller #1.
- White: bright and timeless. Best seller #2.
- Grey: a modern neutral that pairs well with white quartz and brushed hardware. Best seller #3.

## How it works

1. Free measure: every wall is measured.
2. Free 3D design: in the showroom, at home, or by phone or video call, followed by a written, itemized quote with no obligation.
3. Order and delivery: everything is ordered and checked before the old kitchen comes out.
4. Installation by the licensed partner, including removal of old cabinets, clean-up and haul-away.

Included in a quote: measuring and 3D design, cabinets and hardware, delivery, removal of old cabinets, installation, countertop templating, clean-up and haul-away.
Quoted separately: plumbing and electrical hookups, permits, painting, flooring, appliance install.

## Free door samples

- Borrow up to 3 full-size doors for 7 days, free.
- A $25 refundable deposit per door is returned when the doors come back.
- Pick them up at the Norfolk showroom during opening hours.

## Frequently asked questions

- Is the in-home measurement free? Yes, with a written quote and no obligation.
- How long does a kitchen take? It depends on the cabinet line. In-stock cabinets arrive faster than made-to-order lines; the written quote includes an exact delivery date.
- Can I buy cabinets and install them myself? Yes, with pickup at the showroom or delivery.
- Who installs the cabinets? A Virginia-licensed installation partner, with a 1-year installation warranty.
- How fast do you reply? Within one business day.

## Pages

- [Home](${SITE_URL}/): door styles, colors, free samples, 3D design, services, service area, FAQ and the quote form.
- [Blog](${SITE_URL}/blog/): cabinet styles, colors and remodeling advice.
- [Privacy Policy](${SITE_URL}/privacy)
- [SMS Terms](${SITE_URL}/sms-terms)

## Blog articles

${blogLines}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
