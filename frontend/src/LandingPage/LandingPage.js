// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="landing-page-background-image"></div>
      <img src="https://cdn.discordapp.com/attachments/1244622794831036480/1255856170715840542/image-3-renel.jpeg?ex=667ea6b3&is=667d5533&hm=e03876af8e2d45c11508f44a22238abc28f5927e48ae5b88996732c14b7df84b&"></img>
      <div className="content">
        <div className="welcome">
          <div className="logo">
            <svg width="450" height="60" viewBox="0 0 476 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.4746 63.2978C41.5624 63.2978 47.4009 60.8794 51.7056 56.5747C56.0104 52.27 58.4287 46.4315 58.4287 40.3437C58.4287 34.2558 56.0104 28.4174 51.7056 24.1126C47.4009 19.8079 41.5624 17.3895 35.4746 17.3895C29.3868 17.3895 23.5483 19.8079 19.2436 24.1126C14.9388 28.4174 12.5204 34.2558 12.5204 40.3437C12.5204 46.4315 14.9388 52.27 19.2436 56.5747C23.5483 60.8794 29.3868 63.2978 35.4746 63.2978ZM40.0206 46.5395L27.082 51.5159C25.3425 52.1883 23.6299 50.4758 24.3024 48.7363L29.2788 35.7977C29.5747 35.0355 30.1664 34.4437 30.9286 34.1478L43.8672 29.1714C45.6067 28.499 47.3193 30.2115 46.6468 31.951L41.6704 44.8897C41.3835 45.6518 40.7827 46.2436 40.0206 46.5395ZM38.3439 40.3437C38.3439 39.5827 38.0416 38.8529 37.5035 38.3148C36.9654 37.7767 36.2356 37.4744 35.4746 37.4744C34.7136 37.4744 33.9838 37.7767 33.4457 38.3148C32.9076 38.8529 32.6053 39.5827 32.6053 40.3437C32.6053 41.1046 32.9076 41.8344 33.4457 42.3725C33.9838 42.9106 34.7136 43.2129 35.4746 43.2129C36.2356 43.2129 36.9654 42.9106 37.5035 42.3725C38.0416 41.8344 38.3439 41.1046 38.3439 40.3437Z" fill="#28585F"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M35.4745 62.8476C47.9032 62.8476 57.9786 52.7722 57.9786 40.3436C57.9786 27.9149 47.9032 17.8395 35.4745 17.8395C23.0459 17.8395 12.9705 27.9149 12.9705 40.3436C12.9705 52.7722 23.0459 62.8476 35.4745 62.8476Z" fill="#144047" fillOpacity="0.5"/>
              <path d="M35.4737 0C36.3717 0 37.2585 0.156474 38.101 0.458248L69.196 11.7803C70.2491 12.1715 70.9475 13.1774 70.9475 14.3063C70.9475 15.4351 70.2491 16.441 69.196 16.8322L62.7774 19.1682C64.5955 22.0518 65.6264 25.4607 65.6264 29.0484V32.1891C65.6264 35.3633 66.8237 38.6381 68.0985 41.2199C68.819 42.6729 69.6394 44.1035 70.5927 45.4224C70.9475 45.903 71.0472 46.5289 70.8477 47.0989C70.6482 47.6689 70.1826 48.0937 69.6061 48.239L62.5114 50.0272C62.0458 50.1502 61.5469 50.0608 61.1368 49.8037C60.7266 49.5466 60.4384 49.1219 60.3497 48.6413C59.3963 43.8577 59.873 39.5658 60.5825 36.4922C60.9372 34.9051 61.4139 33.2844 62.079 31.7979V29.0484C62.079 25.673 60.9483 22.4877 58.9862 19.9394C57.5561 18.207 55.7048 16.8099 53.5321 15.9493L36.1278 9.05319C35.2188 8.69553 34.1878 9.1426 33.8331 10.0591C33.4783 10.9756 33.9218 12.015 34.8308 12.3727L52.2351 19.2688C53.6097 19.8164 54.818 20.6547 55.8046 21.6829L38.1121 28.1208C37.2696 28.4225 36.3828 28.579 35.4848 28.579C34.5869 28.579 33.7 28.4225 32.8575 28.1208L1.75152 16.8322C0.698391 16.4522 0 15.4351 0 14.3063C0 13.1774 0.698391 12.1715 1.75152 11.7803L32.8465 0.458248C33.689 0.156474 34.5758 0 35.4737 0Z" fill="#144047"/>
              <path d="M106.884 59.3272H77.3936V8.12232H106.884V17.0184H88.2509V28.261H105.588V37.1571H88.2509V50.3611H106.884V59.3272Z" fill="#2B5359"/>
              <path d="M129.159 60.0277C124.792 60.0277 121.232 58.3232 118.477 54.9142C115.745 51.4818 114.379 46.4501 114.379 39.8189C114.379 33.1177 115.768 28.0509 118.547 24.6186C121.325 21.1629 124.956 19.435 129.439 19.435C131.307 19.435 132.953 19.6919 134.377 20.2055C135.802 20.7192 137.027 21.408 138.055 22.272C139.106 23.1359 139.993 24.1049 140.717 25.1789H141.067C140.927 24.4318 140.752 23.3343 140.542 21.8867C140.355 20.4157 140.261 18.9097 140.261 17.3686V4.83008H150.979V59.3272H142.783L140.717 54.2487H140.261C139.584 55.3228 138.732 56.3035 137.705 57.1907C136.701 58.0547 135.498 58.7435 134.097 59.2571C132.696 59.7708 131.05 60.0277 129.159 60.0277ZM132.906 51.5169C135.825 51.5169 137.88 50.6529 139.071 48.9251C140.285 47.1739 140.927 44.5471 140.997 41.0447V39.889C140.997 36.083 140.413 33.176 139.246 31.168C138.078 29.1366 135.907 28.1209 132.731 28.1209C130.373 28.1209 128.528 29.1366 127.197 31.168C125.867 33.1994 125.201 36.1297 125.201 39.959C125.201 43.7883 125.867 46.6719 127.197 48.6099C128.552 50.5479 130.455 51.5169 132.906 51.5169Z" fill="#2B5359"/>
              <path d="M198.086 20.1705V59.3272H189.89L188.454 54.3188H187.894C187.053 55.6497 186.003 56.7354 184.742 57.576C183.481 58.4166 182.092 59.0353 180.574 59.4323C179.056 59.8292 177.48 60.0277 175.846 60.0277C173.044 60.0277 170.604 59.5373 168.526 58.5567C166.448 57.5526 164.825 55.9999 163.657 53.8985C162.513 51.7971 161.941 49.0652 161.941 45.7029V20.1705H172.623V43.0411C172.623 45.843 173.125 47.9561 174.129 49.3804C175.133 50.8047 176.733 51.5169 178.928 51.5169C181.099 51.5169 182.804 51.0265 184.041 50.0459C185.279 49.0419 186.143 47.5825 186.633 45.6679C187.147 43.7299 187.403 41.3716 187.403 38.5931V20.1705H198.086Z" fill="#2B5359"/>
              <path d="M229.887 59.3272H219.03V17.1585H205.126V8.12232H243.792V17.1585H229.887V59.3272Z" fill="#2B5359"/>
              <path d="M272.687 19.435C273.224 19.435 273.842 19.47 274.543 19.5401C275.267 19.5868 275.85 19.6568 276.294 19.7502L275.488 29.7671C275.138 29.6503 274.636 29.5686 273.982 29.5219C273.352 29.4518 272.803 29.4168 272.336 29.4168C270.959 29.4168 269.616 29.5919 268.309 29.9422C267.024 30.2924 265.869 30.8645 264.841 31.6583C263.814 32.4289 262.997 33.4562 262.39 34.7404C261.806 36.0013 261.514 37.554 261.514 39.3986V59.3272H250.832V20.1705H258.922L260.498 26.755H261.024C261.794 25.4241 262.751 24.2099 263.896 23.1125C265.063 21.9918 266.382 21.1045 267.853 20.4507C269.348 19.7736 270.959 19.435 272.687 19.435Z" fill="#2B5359"/>
              <path d="M299.445 19.365C304.698 19.365 308.726 20.5091 311.528 22.7973C314.33 25.0855 315.731 28.5646 315.731 33.2344V59.3272H308.271L306.204 54.0036H305.924C304.803 55.4045 303.659 56.5486 302.492 57.4359C301.324 58.3232 299.982 58.977 298.464 59.3972C296.946 59.8175 295.102 60.0277 292.93 60.0277C290.619 60.0277 288.541 59.584 286.696 58.6968C284.875 57.8095 283.439 56.4552 282.388 54.634C281.337 52.7894 280.812 50.4545 280.812 47.6292C280.812 43.4731 282.271 40.4143 285.19 38.453C288.109 36.4683 292.487 35.3709 298.324 35.1607L305.119 34.9506V33.2344C305.119 31.1797 304.582 29.6737 303.508 28.7163C302.433 27.759 300.939 27.2804 299.024 27.2804C297.133 27.2804 295.277 27.5489 293.456 28.0859C291.634 28.6229 289.813 29.3001 287.992 30.1173L284.455 22.9024C286.533 21.805 288.856 20.941 291.424 20.3106C294.016 19.6802 296.69 19.365 299.445 19.365ZM305.119 41.1848L300.986 41.3249C297.53 41.4183 295.125 42.0371 293.771 43.1812C292.44 44.3253 291.775 45.8313 291.775 47.6993C291.775 49.3337 292.253 50.5012 293.211 51.2017C294.168 51.8788 295.417 52.2173 296.958 52.2173C299.246 52.2173 301.173 51.5402 302.737 50.186C304.325 48.8317 305.119 46.9054 305.119 44.407V41.1848Z" fill="#2B5359"/>
              <path d="M342.664 60.0277C338.788 60.0277 335.484 59.3272 332.752 57.9262C330.021 56.5019 327.942 54.3071 326.518 51.3418C325.094 48.3764 324.382 44.5821 324.382 39.959C324.382 35.1724 325.187 31.2731 326.798 28.261C328.433 25.2256 330.686 22.9958 333.558 21.5715C336.453 20.1472 339.804 19.435 343.61 19.435C346.318 19.435 348.653 19.7035 350.615 20.2406C352.599 20.7543 354.327 21.373 355.798 22.0968L352.646 30.3625C350.965 29.6853 349.4 29.1366 347.953 28.7163C346.505 28.2727 345.057 28.0509 343.61 28.0509C341.742 28.0509 340.189 28.4945 338.952 29.3818C337.714 30.2457 336.792 31.5533 336.185 33.3045C335.578 35.0557 335.274 37.2505 335.274 39.889C335.274 42.4807 335.601 44.6288 336.255 46.3333C336.909 48.0378 337.854 49.3104 339.092 50.1509C340.329 50.9682 341.835 51.3768 343.61 51.3768C345.828 51.3768 347.801 51.0849 349.529 50.5012C351.257 49.8941 352.938 49.0535 354.572 47.9795V57.1207C352.938 58.1481 351.222 58.8836 349.424 59.3272C347.649 59.7942 345.396 60.0277 342.664 60.0277Z" fill="#2B5359"/>
              <path d="M374.361 4.83008V29.2067C374.361 30.6777 374.302 32.1487 374.186 33.6197C374.069 35.0907 373.94 36.5617 373.8 38.0327H373.94C374.664 37.0053 375.4 35.9896 376.147 34.9856C376.917 33.9816 377.735 33.0126 378.599 32.0786L389.561 20.1705H401.609L386.059 37.1571L402.555 59.3272H390.227L378.949 43.4614L374.361 47.1389V59.3272H363.678V4.83008H374.361Z" fill="#2B5359"/>
              <path d="M424.305 19.435C427.924 19.435 431.041 20.1355 433.656 21.5365C436.271 22.9141 438.291 24.9221 439.715 27.5606C441.14 30.199 441.852 33.4212 441.852 37.2271V42.4107H416.6C416.716 45.4227 417.615 47.7927 419.296 49.5205C421.001 51.225 423.359 52.0773 426.371 52.0773C428.87 52.0773 431.158 51.8204 433.236 51.3067C435.314 50.793 437.45 50.0225 439.645 48.9952V57.2608C437.707 58.2181 435.676 58.9186 433.551 59.3622C431.45 59.8058 428.893 60.0277 425.881 60.0277C421.958 60.0277 418.479 59.3038 415.444 57.8562C412.432 56.4085 410.062 54.202 408.334 51.2367C406.629 48.2713 405.777 44.5354 405.777 40.029C405.777 35.4526 406.548 31.6467 408.089 28.6113C409.653 25.5525 411.825 23.2643 414.603 21.7466C417.382 20.2055 420.616 19.435 424.305 19.435ZM424.375 27.0352C422.297 27.0352 420.569 27.7007 419.191 29.0316C417.837 30.3625 417.055 32.4522 416.845 35.3008H431.835C431.812 33.7131 431.52 32.3005 430.959 31.0629C430.422 29.8254 429.605 28.8448 428.508 28.1209C427.434 27.3971 426.056 27.0352 424.375 27.0352Z" fill="#2B5359"/>
              <path d="M472.393 19.435C472.93 19.435 473.548 19.47 474.249 19.5401C474.973 19.5868 475.556 19.6568 476 19.7502L475.194 29.7671C474.844 29.6503 474.342 29.5686 473.688 29.5219C473.058 29.4518 472.509 29.4168 472.042 29.4168C470.665 29.4168 469.322 29.5919 468.015 29.9422C466.73 30.2924 465.575 30.8645 464.547 31.6583C463.52 32.4289 462.703 33.4562 462.095 34.7404C461.512 36.0013 461.22 37.554 461.22 39.3986V59.3272H450.538V20.1705H458.628L460.204 26.755H460.73C461.5 25.4241 462.457 24.2099 463.602 23.1125C464.769 21.9918 466.088 21.1045 467.559 20.4507C469.054 19.7736 470.665 19.435 472.393 19.435Z" fill="#2B5359"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="description">
        A dashboard attendance tracking system for Teachers and the Renel Ghana Foundation. Please select a role to continue.
      </div>
      <div className="button-group">
        <div className="button button-teacher" onClick={() => navigate('/TeacherLogin')}>Teacher</div>
        <div className="button button-admin" onClick={() => navigate('/AdminLogin')}>Administrator</div>
      </div>
    </div>
  );
};

export default LandingPage;