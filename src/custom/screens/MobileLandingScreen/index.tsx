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

const StartTradingFirstBoxIcon = require('../../assets/images/landing/startTrading/FirstBoxIcon.svg');
const StartTradingSecondBoxIcon = require('../../assets/images/landing/startTrading/SecondBoxIcon.svg');
const StartTradingThirdBoxIcon = require('../../assets/images/landing/startTrading/ThirdBoxIcon.svg');
const StartTradingLineIcon = require('../../assets/images/landing/startTrading/LineIcon.svg');

const CheckIcon = require('../../assets/images/landing/CheckIcon.svg');
const SimpleExchange = require('../../assets/images/landing/SimpleExchange.svg');

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
                        <h1>{this.translate('page.body.landing.marketInfo.title.text1')}</h1>
                        <h2>{this.translate('page.body.landing.marketInfo.title.text2')}</h2>
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
                <div className="pg-landing-screen__start-trading__wrap">
                    <MarketsTable />
                    <div className="pg-landing-screen__start-trading__wrap__title">
                        <h1>{this.translate('page.body.landing.startTrading.title')}</h1>
                        <h2>{this.translate('page.body.landing.startTrading.subtitle')}</h2>
                    </div>
                    <div className="pg-landing-screen__start-trading__wrap__content">
                        <div className="pg-landing-screen__start-trading__wrap__box">
                            <img src={StartTradingFirstBoxIcon} alt="StartTradingFirstBoxIcon" />
                            <span>{this.translate('page.body.landing.startTrading.box1.title')}</span>
                            <span>{this.translate('page.body.landing.startTrading.box1.text')}</span>
                            <Link to="/signup" className="landing-button">
                                {this.translate('page.body.landing.startTrading.box1.button')}
                            </Link>
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
                            <span>{this.translate('page.body.landing.startTrading.box2.title')}</span>
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
                            <span>{this.translate('page.body.landing.startTrading.box3.title')}</span>
                            <span>{this.translate('page.body.landing.startTrading.box3.text')}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    public renderPlatformInfoBlock() {
        return (
            <div className="pg-landing-screen__platform-info">
                <div className="pg-landing-screen__platform-info__wrap">
                    <div className="pg-landing-screen__platform-info__wrap__item">
                        <span>{this.translate('page.body.landing.platformInfo.item.first.value')}</span>
                        <span>{this.translate('page.body.landing.platformInfo.item.first.title')}</span>
                    </div>
                    <div className="pg-landing-screen__platform-info__wrap__item">
                        <span>{this.translate('page.body.landing.platformInfo.item.second.value')}</span>
                        <span>{this.translate('page.body.landing.platformInfo.item.second.title')}</span>
                    </div>
                    <div className="pg-landing-screen__platform-info__wrap__item">
                        <span>{this.translate('page.body.landing.platformInfo.item.third.value')}</span>
                        <span>{this.translate('page.body.landing.platformInfo.item.third.title')}</span>
                    </div>
                </div>
            </div>
        );
    }

    public renderSimpleExchangeBlock() {
        return (
            <div className="pg-landing-screen__simple-exchange">
                <div className="pg-landing-screen__simple-exchange__wrap">
                    <div className="pg-landing-screen__simple-exchange__wrap__content">
                        <h1>{this.translate('page.body.landing.simpleExchange.content.title')}</h1>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row">
                            <img src={CheckIcon} alt="CheckIcon" />
                            <span>{this.translate('page.body.landing.simpleExchange.content.text1')}</span>
                        </div>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row">
                            <img src={CheckIcon} alt="CheckIcon" />
                            <span>{this.translate('page.body.landing.simpleExchange.content.text1')}</span>
                        </div>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row">
                            <img src={CheckIcon} alt="CheckIcon" />
                            <span>{this.translate('page.body.landing.simpleExchange.content.text1')}</span>
                        </div>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row">
                            <img src={CheckIcon} alt="CheckIcon" />
                            <span>{this.translate('page.body.landing.simpleExchange.content.text1')}</span>
                        </div>
                        <div className="pg-landing-screen__simple-exchange__wrap__content__text-row">
                            <img src={CheckIcon} alt="CheckIcon" />
                            <span>{this.translate('page.body.landing.simpleExchange.content.text1')}</span>
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
                <div className="pg-landing-screen__news__wrap">
                    <h1>{this.translate('page.body.landing.news.title')}</h1>
                    <div className="pg-landing-screen__news__wrap__cards-wrap">
                        <div className="pg-landing-screen__news__wrap__card">
                            <span>{this.translate('page.body.landing.news.card1.title')}</span>
                            <span>{this.translate('page.body.landing.news.card.more')}</span>
                        </div>
                        <div className="pg-landing-screen__news__wrap__card">
                            <span>{this.translate('page.body.landing.news.card2.title')}</span>
                            <span>{this.translate('page.body.landing.news.card.more')}</span>
                        </div>
                        <div className="pg-landing-screen__news__wrap__card">
                            <span>{this.translate('page.body.landing.news.card3.title')}</span>
                            <span>{this.translate('page.body.landing.news.card.more')}</span>
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
