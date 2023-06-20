import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <>
      <footer className={classes.footer}>
        <div>
          <h3>Company</h3>
          <ul>
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>Services</Link>
            </li>
            <li>
              <Link>Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Support</h3>
          <ul>
            <li>
              <Link>Help & FAQ</Link>
            </li>
            <li>
              <Link>Shipping & Returns</Link>
            </li>
            <li>
              <Link>Terms & Conditions</Link>
            </li>
            <li>
              <Link>Payment Options</Link>
            </li>
            <li>
              <Link>Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Shop</h3>
          <ul>
            <li>
              <Link>Shop</Link>
            </li>
            <li>
              <Link>My Shop</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Social</h3>
          <ul>
            <li>
              <Link
                to={`https://www.linkedin.com/in/mert-evirgen-99ba8a271/`}
                target="_blank"
              >
                <i className="fa-brands fa-linkedin fa-fw"></i> LinkedIn
              </Link>
            </li>
            <li>
              <Link to={`https://github.com/Rhayaden`} target="_blank">
                <i className="fa-brands fa-github fa-fw"></i> Github
              </Link>
            </li>
            <li>
              <Link
                to={`https://discordapp.com/users/152882510316044288/`}
                target="_blank"
              >
                <i className="fa-brands fa-discord fa-fw"></i> Discord
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
