export const apiBaseUrl: string = "http://localhost:9090/api/v1/"
export const BaseUrl: string = "http://localhost:3000/"
export const apiCurrencyExchange: string = "https://api.exchangerate-api.com/v4/latest/USD"
import axios, { type AxiosResponse } from 'axios';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
let headerRequest = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

const alarm = {
  background: "linear-gradient(to right, #eb4034, #d6261a)"
}
const ok = {
  background: "linear-gradient(to right, #00b09b, #96c93d)"
}
// function getUserCookie() {
//   const name = "USER";
//   const cookies = document.cookie.split(";");
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i].trim();
//     const cookieParts = cookie.split("=");
//     const cookieName = cookieParts[0];
//     if (cookieName === name) {
//       return cookieParts[1];
//     }
//   }
//   return null; // Cookie not found
// }
export async function Logout() {
  const jwt = GetCookie("USER");
  if (jwt) {
    try {
      await axios.get(apiBaseUrl + 'auth/logout', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      }).then((response) => {
        if (response.status === 200) {
          RemoveUserCookies("USER");
          window.location.href = "/";
        }
      })
    } catch (error) {
      RemoveUserCookies("USER");
      window.location.href = "/";
    }
  }
}
export function GetCookie(name: string) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const cookieParts = cookie.split("=");
    const cookieName = cookieParts[0];
    if (cookieName === name) {
      return cookieParts[1];
    }
  }
  return null; // Cookie not found
}

export function RemoveUserCookies(name: string) {
  const pastDate = new Date("Thu, 01 Jan 1970 00:00:00 UTC");
  document.cookie = `${name}=; expires=${pastDate.toUTCString()}; path=/;`;
}

export function ShowMessage(message: string, duration: number, notificationType: number) {
  let styles;
  switch (notificationType) {
    case 1:
      styles = alarm;
      break;
    case 2:
      styles = ok;
      break
    default:
      styles = ok;
  }
  Toastify({
    text: message,
    duration: duration,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: styles,
    onClick: function () { } // Callback after click
  }).showToast();
}

export function CurrencyHandler(value: number) {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',

  });
  return formatter.format(value);
}


export async function AuthenticatePage(roles: string) {
  let jwtData = {
    email: "",
    roles: "",
    createDate: "",
    isActive: false
  }

  const token = GetCookie("USER");
  if (token != null) {
    let header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    }
    await axios.get(apiBaseUrl + 'account', {
      headers: header
    })
      .then((res) => {
        if (res.status === 200) {
          jwtData = res.data;
          console.log(jwtData);
        }
      });
    if (jwtData.roles !== roles) {
      window.location.href = "/";
    }
  }
}

export function IsLogin() {
  const token = GetCookie("USER");
  if (token != null) {
    return true;
  }
  return false;
}

export function DisableSubmitButton() {
  (document.getElementById('submitButton') as HTMLButtonElement).hidden = true;
  (document.getElementById('loader') as HTMLElement).hidden = false;

}
export function EnableSubmitButton() {
  (document.getElementById('submitButton') as HTMLButtonElement).hidden = false;
  (document.getElementById('loader') as HTMLElement).hidden = true;

}

export async function CurrencyExchange(amount: number): Promise<number> {
  try {
    const response: AxiosResponse = await axios.get(apiCurrencyExchange);
    const VNDRate: number = response.data['rates']['VND'];
    const FromVNDToUSD: number = amount / VNDRate;

    console.log(`VND: ${VNDRate}, From VND to USD: ${FromVNDToUSD.toFixed(3)}`);

    return FromVNDToUSD.toFixed(3);
  } catch (error) {
    console.error('Error fetching currency exchange data:', error);
    throw error; // You can handle the error appropriately in your application.
  }
};

export async function VNDRate(): Promise<number> {
  try {
    const response: AxiosResponse = await axios.get(apiCurrencyExchange);
    const VNDRate: number = response.data['rates']['VND'];
    return VNDRate;
  } catch (error) {
    console.error('Error fetching currency exchange data:', error);
    throw error; // You can handle the error appropriately in your application.
  }
};

