import React, { useState } from 'react';
import './assets/vendor/css/pages/app-ecommerce.css';
import './assets/vendor/fonts/fontawesome.css';
import './assets/vendor/css/rtl/core.css';
import './assets/vendor/css/rtl/theme-default.css';
import './assets/css/demo.css';
import './assets/vendor/fonts/tabler-icons.css';
import avtar from './assets/img/avatars/1.png';
import { ethers } from 'ethers';
import { Web3Modal } from '@web3modal/standalone';
import "./App.css"
                                                                                                      
const App = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      setProvider(provider);
  
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      setAccount(account);
  
      // Save wallet info to backend
      await saveWallet(account, provider);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
    }
  };

  const saveWallet = async (account, provider) => {
    try {
      const balance = await provider.getBalance(account);
      const formattedBalance = ethers.utils.formatEther(balance);

      await fetch('http://localhost:5000/api/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: account,
          balance: formattedBalance,
        }),
      });
    } catch (error) {
      console.error('Error saving wallet:', error);
    }
  };
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Sidebar */}
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
          <div className="app-brand demo">
            <span className="app-brand-logo demo">
              <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z" fill="#7367F0" />
                <path opacity="0.06" fillRule="evenodd" clipRule="evenodd" d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616" />
                <path opacity="0.06" fillRule="evenodd" clipRule="evenodd" d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z" fill="#7367F0" />
              </svg>
            </span>
            <span className="app-brand-text demo menu-text fw-bold">Vuexy</span>
          </div>
          <li className="menu-item active">
            <a href="app-ecommerce-referral.html" className="menu-link">
              <div data-i18n="Referrals">Referrals</div>
            </a>
          </li>
        </aside>
        {/* Navbar */}
        <div className="layout-page">
          <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i className="ti ti-menu-2 ti-md"></i>
              </a>
            </div>
            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <div className="navbar-nav align-items-center">
                <div className="nav-item navbar-search-wrapper mb-0">
                  <a className="nav-item nav-link search-toggler d-flex align-items-center px-0" href="javascript:void(0);">
                    <i className="ti ti-search ti-md me-2 me-lg-4 ti-lg"></i>
                    <span className="d-none d-md-inline-block text-muted fw-normal">Search (Ctrl+/)</span>
                  </a>
                </div>
              </div>
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                <li><i className="ti ti-language rounded-circle ti-md"></i></li>
                <li><i className="ti ti-layout-grid-add ti-md"></i></li>
                <li><i className="ti ti-bell ti-md"></i></li>
                <li className="avatar avatar-online">
                  <img src={avtar} alt="User Avatar" className="rounded-circle" />
                </li>
              </ul>
            </div>
          </nav>

          {/* Content */}
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-6 g-6">
                <div className="col-sm-6 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="content-left">
                          <h5 className="mb-1">$24,983</h5>
                          <small>Total Earning</small>
                        </div>
                        <span className="badge bg-label-primary rounded-circle p-2">
                          <i className="ti ti-currency-dollar ti-lg"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="content-left">
                          <h5 className="mb-1">$8,647</h5>
                          <small>Unpaid Earning</small>
                        </div>
                        <span className="badge bg-label-success rounded-circle p-2">
                          <i className="ti ti-gift ti-lg"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="content-left">
                          <h5 className="mb-1">2,367</h5>
                          <small>Signups</small>
                        </div>
                        <span className="badge bg-label-danger rounded-circle p-2">
                          <i className="ti ti-users ti-lg"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="content-left">
                          <h5 className="mb-1">4.5%</h5>
                          <small>Conversion Rate</small>
                        </div>
                        <span className="badge bg-label-info rounded-circle p-2">
                          <i className="ti ti-infinity ti-lg"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-6 g-6">
                <div className="col-lg-7">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="mb-1">How to use</h5>
                      <p className="mb-6 card-subtitle mt-0">Integrate your referral code in 3 easy steps.</p>
                      <div className="d-flex flex-column flex-sm-row justify-content-between text-center gap-6">
                        <div className="d-flex flex-column align-items-center">
                          <span className="p-4 border-1 border-primary rounded-circle border-dashed mb-0 w-px-75 h-px-75">
                            <img src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/svg/icons/rocket.svg" alt="Rocket"/>
                          </span>
                          <p className="my-2 w-75">Create & validate your referral link and get</p>
                          <h6 className="text-primary mb-0">$50</h6>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          <span className="p-4 border-1 border-primary rounded-circle border-dashed mb-0 w-px-75 h-px-75">
                            <img src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/svg/icons/user-info.svg" alt="user-info"/>
                          </span>
                          <p className="my-2 w-75">For every new signup you get</p>
                          <h6 className="text-primary mb-0">10%</h6>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          <span className="p-4 border-1 border-primary rounded-circle border-dashed mb-0 w-px-75 h-px-75">
                            <img src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/svg/icons/paper.svg" alt="paper"/>
                          </span>
                          <p className="my-2 w-75">Get other friends to generate link and get</p>
                          <h6 className="text-primary mb-0">$100</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="card h-100">
                    <div className="card-body">
                      <form className="referral-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-6 mt-1">
                          <h5 className="mb-5">Invite your friends</h5>
                          <div className="d-flex gap-4 align-items-end">
                            <div className="w-100">
                              <label className="form-label mb-1" htmlFor="referralEmail">Enter friend’s email address and invite them</label>
                              <input type="email" id="referralEmail" name="referralEmail" className="form-control w-100" placeholder="Email address" />
                            </div>
                            <div>
                              <button type="submit" className="btn btn-primary">
                                <i className='ti ti-check ti-xs me-2'></i>Submit
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="mb-5">Share the referral link</h5>
                          <div className="d-flex gap-4 align-items-end">
                            <div className="w-100">
                              <label className="form-label mb-1" htmlFor="referralLink">Share referral link in social media</label>
                              <input type="text" id="referralLink" name="referralLink" className="form-control w-100 h-px-40" placeholder="pixinvent.com/?ref=6479" />
                            </div>
                            <div className="d-flex">
                              <button type="button" className="btn btn-facebook btn-icon me-2">
                                <i className='ti ti-brand-facebook text-white ti-md'></i>
                              </button>
                              <button type="button" className="btn btn-twitter btn-icon">
                                <i className='ti ti-brand-twitter text-white ti-md'></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-datatable table-responsive">
                  <table className="datatables-referral table border-top">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th>Users</th>
                        <th className="text-nowrap">Referred ID</th>
                        <th>Status</th>
                        <th>Value</th>
                        <th className="text-nowrap">Earnings</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
              <button onClick={connectWallet} className="btn btn-primary">
                     Connect Wallet
                </button>
                {account && <p>Connected: {account}</p>}
              {/* Connect Wallet Button */}
               {/* Footer */}
        <footer className="content-footer footer bg-footer-theme">
          <div className="container-xxl d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
            <div className="text-body">© {new Date().getFullYear()}, made with ❤️ by <a href="https://pixinvent.com/" target="_blank" className="footer-link">Pixinvent</a></div>
            <div className="d-none d-lg-inline-block">
              <a href="https://themeforest.net/licenses/standard" className="footer-link me-4" target="_blank">License</a>
              <a href="https://1.envato.market/pixinvent_portfolio" target="_blank" className="footer-link me-4">More Themes</a>
              <a href="https://demos.pixinvent.com/vuexy-html-admin-template/documentation/" target="_blank" className="footer-link me-4">Documentation</a>
              <a href="https://pixinvent.ticksy.com/" target="_blank" className="footer-link d-none d-sm-inline-block">Support</a>
            </div>
          </div>
             </footer>
              </div>
            </div>
          </div>
        </div>
        <div>
      </div>
      <br />
      <br />
      <div className="layout-overlay layout-menu-toggle"></div>
      <div className="buy-now">
        <a href="https://1.envato.market/vuexy_admin" target="_blank" className="btn btn-danger btn-buy-now">Buy Now</a>
      </div>
    </div>
  );
};
export default App;
