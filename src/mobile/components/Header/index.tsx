import * as React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoIcon } from '../../../assets/images/LogoIcon';
//import { NavBar } from '../../../containers';
//import { ProfileIcon } from '../../../assets/images/sidebar/ProfileIcon';
import { selectUserLoggedIn } from '../../../modules';

const HeaderComponent: React.FC = () => {
    const userLoggedIn = useSelector(selectUserLoggedIn);
    const intl = useIntl();

    return (
        <div className="pg-mobile-header">
            <Link to="/" className="pg-mobile-header__logo">
                <LogoIcon className="pg-mobile-header__logo__icon" />
            </Link>

            <Navbar className="pg-mobile-header__navbar" collapseOnSelect  expand='sm' bg='#ffffff' variant='light'>
                <Container className="pg-mobile-header__container"> 
                    <Navbar.Toggle className="pg-mobile-header__menu" aria-controls='responsive-navbar-nav' >   
                    </Navbar.Toggle >
                    <Navbar.Collapse  id='responsive-navbar-nav'>
                        <Nav >
                            <Nav.Link className="pg-mobile-header__container__link" href="http://content.cryptosmart.it/">&nbsp;&nbsp;Acquista Crypto</Nav.Link>
                            <Nav.Link className="pg-mobile-header__container__link" href="http://content.cryptosmart.it/crypto-academy/">&nbsp;&nbsp;Academy</Nav.Link>
                            <Nav.Link className="pg-mobile-header__container__link" href="http://content.cryptosmart.it/assistenza/">&nbsp;&nbsp;Assistenza</Nav.Link>
                            <Nav.Link className="pg-mobile-header__container__link" href="http://content.cryptosmart.it/chi-siamo/">&nbsp;&nbsp;Chi siamo</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="pg-mobile-header__account">
                {userLoggedIn ? (
                    <div></div>
                ) : (
                    <Link to="/signin" className="pg-mobile-header__account__log-in">
                        <Button
                            block={true}
                            type="button"
                            size="lg"
                            variant="primary"
                        >
                            {intl.formatMessage({id: 'page.mobile.header.signIn'})}
                        </Button>
                    </Link>
                )}
            </div>        
        </div>
    );
};

export const Header = React.memo(HeaderComponent);
