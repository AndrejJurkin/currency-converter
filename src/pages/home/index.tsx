import { styled } from "styled-components";
import { CurrencyConverter } from "./currency-converter";
import { ExchangeRatesTable } from "./exchange-rates-table";
import { useExchangeRates } from "./useExchangeRates";

export function HomePage() {
  const [exchangeRates, query] = useExchangeRates();

  return (
    <Root>
      <Container>
        <Heading>Currency Converter</Heading>
        {exchangeRates && <CurrencyConverter exchangeRates={exchangeRates} />}
        <ExchangeRatesTable
          exchangeRates={exchangeRates || []}
          isLoading={query.isLoading}
          error={!!query.error}
        />
      </Container>
      <Background />
    </Root>
  );
}

const Root = styled.div`
  position: relative;
  background-color: #fefefe;
  height: 100vh;
`;

const Heading = styled.h1`
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 600;
  color: white;
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  padding-left: 16px;
  padding-right: 16px;
  margin: 0 auto;
  padding-bottom: 64px;
`;

const Background = styled.div`
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40vh;
  background-color: #0a2a6b;
  clip-path: ellipse(130% 70% at 50% 0%);
`;
