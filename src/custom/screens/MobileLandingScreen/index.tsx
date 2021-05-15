import classnames from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import { toggleColorTheme } from '../../../helpers';
import {
    RootState,
    selectCurrentColorTheme,
    selectUserLoggedIn,
} from '../../../modules';
import { LogoWhite } from '../../assets/images/LogoWhite';
import { MarketsTable } from '../../containers';

const StartTradingFirstBoxIcon = require('../../assets/images/landing/startTrading/icona1.svg');
const StartTradingSecondBoxIcon = require('../../assets/images/landing/startTrading/icona2.svg');
const StartTradingThirdBoxIcon = require('../../assets/images/landing/startTrading/icona3.svg');
const StartTradingLineIcon = require('../../assets/images/landing/startTrading/LineIcon.svg');

const CheckIcon = require('../../assets/images/landing/checked.png');
const SimpleExchange = require('../../assets/images/landing/cryptosmartphone3.png');

const TwitterIcon = require('../../../assets/images/landing/social/Twitter.svg');
const YouTubeIcon = require('../../../assets/images/landing/social/YouTube.svg'); 
const FacebookIcon = require('../../../assets/images/landing/social/Facebook.svg');
const InstagramIcon = require('../../../assets/images/landing/social/Instagram.svg');


interface ReduxProps {
    isLoggedIn: boolean;
    colorTheme: string;
}

type Props = ReduxProps & RouteProps & IntlProps;

interface State {
    pageYOffset: number;
}

class Landing extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            pageYOffset: 0,
        };
    }

    public componentDidMount() {
        if (this.props.colorTheme === 'dark') {
            toggleColorTheme('light');
        }
        window.addEventListener('scroll', this.handleScroll);
    }

    public componentWillReceiveProps(next: Props) {
        if (next.colorTheme === 'dark') {
            toggleColorTheme('light');
        }
    }

    public componentWillUnmount() {
        if (this.props.colorTheme === 'dark') {
            toggleColorTheme(this.props.colorTheme);
        }
        window.removeEventListener('scroll', this.handleScroll);
    }

    public renderHeader() {
        const headerClass = classnames('pg-landing-screen__header', {
            'pg-landing-screen__header--scrolled': this.state.pageYOffset > 64,
        });

        if (this.props.isLoggedIn) {
            return (
                <div className={headerClass}>
                    <div className="pg-landing-screen__header__wrap">
                        <div className="pg-landing-screen__header__wrap__left" onClick={e => this.handleScrollTop()}>
                            <LogoWhite />
                        </div>
                        <div className="pg-landing-screen__header__wrap__center">
                            <Link to="/about" className="pg-landing-screen__header-link">
                                {this.translate('page.body.landing.header.center.link.about')}
                            </Link>
                            <Link to="/learn" className="pg-landing-screen__header-link">
                                {this.translate('page.body.landing.header.center.link.learn')}
                            </Link>
                            <Link to="/features" className="pg-landing-screen__header-link">
                                {this.translate('page.body.landing.header.center.link.features')}
                            </Link>
                            <Link to="/support" className="pg-landing-screen__header-link">
                                {this.translate('page.body.landing.header.center.link.support')}
                            </Link>
                            <Link to="/blog" className="pg-landing-screen__header-link">
                                {this.translate('page.body.landing.header.center.link.blog')}
                            </Link>
                        </div>
                        <div className="pg-landing-screen__header__wrap__right">
                            <Link to="/profile" className="landing-button">
                                {this.translate('page.body.landing.header.button1')}
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={headerClass}>
                <div className="pg-landing-screen__header__wrap">
                    <div className="pg-landing-screen__header__wrap__left" onClick={e => this.handleScrollTop()}>
                        <LogoWhite />
                    </div>
                    <div className="pg-landing-screen__header__wrap__center">
                        <Link to="/about" className="pg-landing-screen__header-link">
                            {this.translate('page.body.landing.header.center.link.about')}
                        </Link>
                        <Link to="/learn" className="pg-landing-screen__header-link">
                            {this.translate('page.body.landing.header.center.link.learn')}
                        </Link>
                        <Link to="/features" className="pg-landing-screen__header-link">
                            {this.translate('page.body.landing.header.center.link.features')}
                        </Link>
                        <Link to="/support" className="pg-landing-screen__header-link">
                            {this.translate('page.body.landing.header.center.link.support')}
                        </Link>
                        <Link to="/blog" className="pg-landing-screen__header-link">
                            {this.translate('page.body.landing.header.center.link.blog')}
                        </Link>
                    </div>
                    <div className="pg-landing-screen__header__wrap__right">
                        <Link to="/signin" className="landing-button landing-button--simple">
                            {this.translate('page.body.landing.header.button2')}
                        </Link>
                        <Link to="/signup" className="landing-button">
                            {this.translate('page.body.landing.header.button3')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    public renderMarketInfoBlock() {
        return (
            <div className="pg-moblanding-screen__market-info">
                <div className="pg-moblanding-screen__market-info__wrap">
                    <div className="pg-moblanding-screen__market-info__wrap__title">
                        <h1 style={{fontSize: "2.2em", lineHeight: "1.2em" }}>{this.translate('page.body.landing.marketInfo.title.text1')}</h1>
                        <h2 style={{fontSize: "1.4em", lineHeight: "1.2em", marginTop: "15px"}} className="pg-moblanding-screen-h2">{this.translate('page.body.landing.marketInfo.title.text2')}</h2>
                        <Link to="/signup" className="landing-button">
                            {this.translate('page.body.landing.marketInfo.title.button')}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    public renderStartTradingBlock() {
        return (
            <div className="pg-landing-screen__start-trading">
                <div className="pg-moblanding-screen__start-trading__wrap">
                    <MarketsTable />
                    <div className="pg-moblanding-screen__start-trading__wrap__title">
                        <h1>Compra&Vendi subito</h1>
                        <h2>{this.translate('page.body.landing.startTrading.subtitle')}</h2>
                    </div>
                    <div className="pg-landing-screen__start-trading__wrap__content">
                        <div className="pg-landing-screen__start-trading__wrap__box">
                            <img src={StartTradingFirstBoxIcon} alt="StartTradingFirstBoxIcon" />
                            <h3><span>{this.translate('page.body.landing.startTrading.box1.title')}</span></h3>
                            <span>{this.translate('page.body.landing.startTrading.box1.text')}</span>
                            
                        </div>
                        <div className="pg-landing-screen__start-trading__wrap__box">
                            <img
                                className="pg-landing-screen__start-trading__wrap__box-line"
                                src={StartTradingLineIcon}
                                alt="StartTradingLineIcon"
                            />
                        </div>
                        <div className="pg-landing-screen__start-trading__wrap__box">
                            <img src={StartTradingSecondBoxIcon} alt="StartTradingSecondBoxIcon" />
                            <h3><span>{this.translate('page.body.landing.startTrading.box2.title')}</span></h3>
                            <span>{this.translate('page.body.landing.startTrading.box2.text')}</span>
                        </div>
                        <div className="pg-landing-screen__start-trading__wrap__box">
                            <img
                                className="pg-landing-screen__start-trading__wrap__box-line"
                                src={StartTradingLineIcon}
                                alt="StartTradingLineIcon"
                            />
                        </div>
                        <div className="pg-landing-screen__start-trading__wrap__box">
                            <img src={StartTradingThirdBoxIcon} alt="StartTradingThirdBoxIcon" />
                            <h3><span>{this.translate('page.body.landing.startTrading.box3.title')}</span></h3>
                            <span>{this.translate('page.body.landing.startTrading.box3.text')}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    public renderPlatformInfoBlock() {
        return (
            <div className="pg-moblanding-screen__platform-info">
                <div className="pg-landing-screen__platform-info__wrap">
                <h1>Partecipa alla rivoluzione digitale</h1>
                    <Link to="/signup" className="landing-button">
                                {this.translate('page.body.landing.startTrading.box1.button')}
                            </Link>
                </div>
            </div>
        );
    }

    public renderSimpleExchangeBlock() {
        return (
            <div className="pg-landing-screen__simple-exchange">
                <div className="pg-landing-screen__simple-exchange__wrap">
                    <div className="pg-moblanding-screen__simple-exchange__wrap__content">
                        <h1>{this.translate('page.body.landing.simpleExchange.content.title')}</h1>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row">
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row__icon"><img src={CheckIcon} alt="CheckIcon" /> </div>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row__testo"><span>{this.translate('page.body.landing.simpleExchange.content.text1')}</span></div>
                        </div>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row">
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row__icon"><img src={CheckIcon} alt="CheckIcon" /></div>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row__testo"><span>{this.translate('page.body.landing.simpleExchange.content.text2')}</span></div>
                        </div>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row">
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row__icon"><img src={CheckIcon} alt="CheckIcon" /></div>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row__testo"><span>{this.translate('page.body.landing.simpleExchange.content.text3')}</span></div>
                        </div>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row">
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row__icon"><img src={CheckIcon} alt="CheckIcon" /></div>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row__testo"><span>{this.translate('page.body.landing.simpleExchange.content.text4')}</span></div>
                        </div>
                        
                    </div>
                    <img
                        className="pg-landing-screen__simple-exchange__wrap__image"
                        src={SimpleExchange}
                        alt="SimpleExchange"
                    />
                </div>
            </div>
        );
    }

    public renderNewsBlock() {
        return (
            <div className="pg-landing-screen__news">
                <div className="pg-moblanding-screen__news__wrap">
                <h1>Crypto Academy</h1>
                    <div className="pg-landing-screen__news__wrap__cards-wrap">
                        <div className="pg-moblanding-screen__news__wrap__card">
                            <h2>Blockchain e Criptovalute</h2>
                            <span>Chi ha inventato Bitcoin? Una persona o un gruppo di persone identificatesi con il nome Nakamoto....</span>
                            <a href="http://content.cryptosmart.it/blockchain-e-criptovalute/">Leggi tutto</a>
                        </div>
                        <div className="pg-moblanding-screen__news__wrap__card">
                            <h2>Definizione di Bitcoin</h2>
                            <span>I Bitcoin sono denaro digitale che consente di effettuare transazioni peer-to-peer sicure: gli utenti possono....</span>
                            <a href="http://content.cryptosmart.it/bitcoin/">Leggi tutto</a>
                        </div>
                        <div className="pg-moblanding-screen__news__wrap__card">
                            <h2>Cos’è Ethereum?</h2>
                            <span>Ethereum è la seconda criptovaluta per capitalizzazione di mercato ed è stata lanciata nel 2015....</span>
                            <a href="http://content.cryptosmart.it/ethereum/">Leggi tutto</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    public renderFooter() {
        return (
            <div className="pg-landing-screen__footer">
                <div className="pg-landing-screen__footer__wrap">
                    <div className="pg-landing-screen__footer__wrap__left" onClick={e => this.handleScrollTop()}>
                        <LogoWhite />
                    </div>
                    <div className="pg-landing-screen__footer__wrap__navigation">
                        <div className="pg-landing-screen__footer__wrap__navigation__col">
                            <Link to="/trading/">{this.translate('page.body.landing.footer.exchange')}</Link>
                            <Link to="/wallets">{this.translate('page.body.landing.footer.wallets')}</Link>
                            <Link to="/">{this.translate('page.body.landing.footer.fees')}</Link>
                        </div>
                        <div className="pg-landing-screen__footer__wrap__navigation__col">
                            <Link to="/">{this.translate('page.body.landing.footer.faq')}</Link>
                            <Link to="/">{this.translate('page.body.landing.footer.support')}</Link>
                            <Link to="/">{this.translate('page.body.landing.footer.privacy')}</Link>
                        </div>
                        <div className="pg-landing-screen__footer__wrap__navigation__col">
                            <Link to="/">{this.translate('page.body.landing.footer.about')}</Link>
                            <Link to="/">{this.translate('page.body.landing.footer.community')}</Link>
                            <Link to="/">{this.translate('page.body.landing.footer.info')}</Link>
                        </div>
                    </div>
                    <div className="pg-landing-screen__footer__wrap__social">
                        <div className="pg-landing-screen__footer__wrap__social__row">
                            <img src={YouTubeIcon} alt="YouTube" />
                            <img src={FacebookIcon} alt="Facebook" />
                            <img src={InstagramIcon} alt="Instagram" />
                            <img src={TwitterIcon} alt="Twitter" />
                        </div>
                    </div>
                </div>
                <span className="pg-landing-screen__footer__rights">{this.translate('page.body.landing.footer.rights')}</span>
            </div>
        );
    }

    public render() {
        return (
            <div className="pg-landing-screen">
                {this.renderHeader()}
                {this.renderMarketInfoBlock()}
                {this.renderStartTradingBlock()}
                {this.renderPlatformInfoBlock()}
                {this.renderSimpleExchangeBlock()}
                {this.renderNewsBlock()}
                {this.renderFooter()}
            </div>
        );
    }

    private handleScroll = (event) => {
        this.setState({
            pageYOffset: window.pageYOffset
        });
    };

    private handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    private translate = (key: string) => this.props.intl.formatMessage({id: key});
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    isLoggedIn: selectUserLoggedIn(state),
    colorTheme: selectCurrentColorTheme(state),
});

export const MobileLandingScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, null),
)(Landing) as React.ComponentClass;
