import React, {useState, useEffect} from 'react';
import './index.less';
import {useDispatch, useSelector} from './../../hooks';
import {history, useLocation} from 'umi';

interface Props {
  bg: string;
  username: string;
}

function Index (props: Props): JSX.Element {
  const [ isShow, setIsShow ] = useState(false);
  const { bg } = props;
  const {global: {isUserLogin, info: {name}}} = useSelector(state => state);
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;

  const navList = [
    {
      name: 'Home',
      label: 'home',
      link: ''
    },
    {
      name: 'Performance',
      label: 'performance',
      link: 'performance'
    }
  ];

  const logout = () => {
    dispatch.global.Logout();
  };

  useEffect(() => {
    dispatch.global.GetAsset();
  }, []);


  return (
    <div id="commonHeader" className={bg === 'white' ? "white" : ''}>
      <header className="mainContent">
        <ul>
          {
            navList.map((i, key) => (
              <li key={key.toString()} className={pathname === `/${i.link}` ? 'menu active' : 'menu'} onClick={() => {history.push(i.link); window.scrollTo(0, 0);}}>
                <span> {i.name} </span>
              </li>
            ))
          }

          <li>
            <div onClick={() => window.open("http://www.viinet.com/", '_blank')}>
              {bg !== 'white'
                ? <img src="https://cdn.cnviinet.com/APP2.0/Logotitle-202005140949.svg" alt="" />
                : <img src="https://cdn.cnviinet.com/viinet-web/static/VIINETlogo202005061543.svg" alt="" />}
            </div>
          </li>

          <li className={pathname === `/login` ? 'lastLi active' : 'lastLi'}>
            {isUserLogin
              ? <span onClick={() => setIsShow(!isShow)} className='name'>{name || 'User'}</span>
              : <span onClick={() => history.push('/login')}>Investor Login </span>
            }

            {isUserLogin && <ul className={`addition slideDown  ${bg === 'white' ? 'white' : ''}`}>
              <li onClick={() => history.push('/change_password')} ><span>Change Password</span></li>
              <li onClick={logout}><span>Logout</span></li>
            </ul>
            }
          </li>
        </ul>

      </header>
    </div>
  );
}

export default Index;
