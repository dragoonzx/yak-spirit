import { Helmet } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
};

export const Head = ({
  title = 'Yak Spirit | Yield Yak DEX aggregator',
  description = 'Yield Yak DEX aggregator: find best swap route on Avalanche network',
}: Props) => (
  <Helmet>
    <title>{`${title}`}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={`${title}`} />
    <meta property="og:description" content={description} />
    <meta name="robots" content="noindex" />
  </Helmet>
);
