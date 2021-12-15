import { Helmet } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
};

const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME;

export const Head = ({
  title = 'Yak Spirit | Yield Yak DEX aggregator',
  description = 'Yield Yak DEX aggregator: find best swap route on Avalanche network',
}: Props) => (
  <Helmet>
    <title>{`${title} | ${SERVICE_NAME}`}</title>
    <meta name="description" content={description ?? `This is ${SERVICE_NAME}`} />
    <meta property="og:title" content={`${title} | ${SERVICE_NAME}`} />
    <meta property="og:description" content={description ?? `This is ${SERVICE_NAME}`} />
    <meta name="robots" content="noindex" />
  </Helmet>
);
