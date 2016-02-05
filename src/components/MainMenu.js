import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
import styles from './MainMenu.css'

class MainMenu extends React.Component {

    componentDidMount() {
        $('.ui.dropdown').dropdown();
    }

    render() {
        var menu = [
            { href: "/", icon: "home icon", title: "Home" },
            { href: "/movies", icon: "file text icon", title: "Movies" },
            { href: "/chart",  icon: "desktop icon", title: "Charts" },
            { href: "/kanban", icon: "github icon", title: "Kanban" },
            { href: "/about",  icon: "calendar icon", title: "About" }
        ];
        var mainMenu = [];
        menu.forEach((item,i)=> {
            mainMenu.push(
                <Link activeClassName="active" to={item.href} key={item.href}>
                    <i className={item.icon}></i> {item.title}
                </Link>
            );
        });
        return (
            <div className="ui pointing menu">
                {mainMenu}

                <div className="right menu">
                    <div className="item">
                        <div className="ui icon input">
                            <input type="text" placeholder="Search..."/>
                            <i className="search link icon"></i>
                        </div>
                    </div>
                    <div className="ui dropdown item">
                        Tools
                        <i className="dropdown icon"></i>

                        <div className="menu">
                            <a className="item" href="upload-data.html">
                                Upload Data
                            </a>
                            <a className="item" href="upload-file.html">
                                Upload File
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainMenu;
