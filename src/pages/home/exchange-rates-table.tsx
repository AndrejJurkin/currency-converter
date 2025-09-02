import { styled } from "styled-components";

interface ExchangeRate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

interface Props {
  exchangeRates: ExchangeRate[];
  isLoading: boolean;
  error: boolean;
}

export function ExchangeRatesTable({ exchangeRates, isLoading, error }: Props) {
  return (
    <RatesTable>
      <TableHeading>Exchange Rates</TableHeading>
      {isLoading && <LoadingText>Loading exchange rates...</LoadingText>}
      {error && <ErrorText>Error loading exchange rates</ErrorText>}
      {exchangeRates && (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Code</th>
                <th>Rate (CZK)</th>
              </tr>
            </thead>
            <tbody>
              {exchangeRates.map((rate, index) => (
                <tr key={index}>
                  <td>{rate.country}</td>
                  <td>{rate.currency}</td>
                  <td>{rate.amount}</td>
                  <td>{rate.code}</td>
                  <td>{rate.rate.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </RatesTable>
  );
}

const RatesTable = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 32px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 8px;
`;

const TableHeading = styled.h2`
  margin: 0 0 24px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 24px;
  color: #666;
  font-style: italic;
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 24px;
  color: #d32f2f;
  font-weight: 500;
`;

const Table = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  font-size: 0.9rem;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  th {
    background-color: #f5f5f5;
    font-weight: 600;
    color: #333;
  }

  tr:hover {
    background-color: #f9f9f9;
  }

  td {
    color: #555;
  }
`;
