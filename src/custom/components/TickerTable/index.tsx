import React from 'react';
import { useIntl } from 'react-intl';
import { Decimal } from '../../../components';
import { CryptoIcon } from '../../../components/CryptoIcon';
import { Currency, Market } from '../../../modules';

interface Props {
    currencies: Currency[];
    currentBidUnit: string;
    currentBidUnitsList: string[];
    markets: Market[];
    redirectToTrading: (key: string) => void;
    setCurrentBidUnit: (key: string) => void;
}

export const TickerTable: React.FC<Props> = ({
    currencies,
    currentBidUnit,
    markets,
    setCurrentBidUnit,
    currentBidUnitsList,
    redirectToTrading,
}) => {
    const { formatMessage } = useIntl();

    const renderItem = React.useCallback(
        (market, index: number) => {
            const currency = currencies?.find(curr => curr.id === market.base_unit);
            const currencyQuote = currencies?.find(curr => curr.id === market.quote_unit);
            const marketChangeColor = +(market.change || 0) < 0 ? 'negative' : 'positive';

            return (
                <tr key={index}>
                    <td>
                        <CryptoIcon className="pg-ticker-table__currency-icon" code={currency?.id?.toUpperCase() || ''} />
                        <div className="pg-ticker-table__currency-shortname">{currency?.id?.toUpperCase() || ''}</div>
                        <div className="pg-ticker-table__currency-name">{currency?.name || ''}</div>
                    </td>
                    <td>
                        <span>
                            {currencyQuote?.symbol || null}
                            <Decimal fixed={2} thousSep=",">
                                {market.last}
                            </Decimal> &euro;
                        </span>
                    </td>
                    <td>
                        <span className={marketChangeColor}>{market.price_change_percent}</span>
                    </td>
                    <td>
                        <span
                            className="pg-ticker-table__trade-button"
                            onClick={() => redirectToTrading(market.id)}
                        >
                            {formatMessage({ id: 'page.body.marketsTable.buy' })}
                        </span>
                    </td>
                </tr>
            );
        },
        [
            currencies,
            formatMessage,
            redirectToTrading,
        ]
    );

    return (
        <div className="pg-ticker-table">
            <div className="pg-ticker-table__filter">
                <ul className="navigation" role="tablist">
                    {currentBidUnitsList.map((item, i) => (
                        <li
                            key={i}
                            className={`navigation__item ${item === currentBidUnit && 'navigation__item--active'}`}
                            onClick={() => setCurrentBidUnit(item)}>
                            <span className="navigation__item__link">
                                {item ? item.toUpperCase() : formatMessage({ id: 'page.body.marketsTable.filter.all' })}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pg-ticker-table__table-wrap">
                <table className="pg-ticker-table__table">
                    <thead>
                        <tr>
                            <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.pair' })}</th>
                            <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.lastPrice' })}</th>
                            <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.change' })}</th>
                            <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.trade' })}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {markets[0] ? (
                            markets.map(renderItem)
                        ) : (
                            <tr>
                                <td>
                                    <span className="no-data">{formatMessage({ id: 'page.noDataToShow' })}</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
