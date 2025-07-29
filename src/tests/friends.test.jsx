import {
  beforeEach,
  expect,
  test,
  beforeAll,
  afterAll,
  afterEach,
} from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { server } from "../mocks/server";
import { BrowserRouter } from "react-router-dom";

import App from "../App";
import fs from "fs";
import path from "path";

const isAuthContextFileExists = fs.existsSync(
  path.resolve(__dirname, "../contexts/AuthContextProvider.jsx"),
  "utf8"
);

const authContextFile = isAuthContextFileExists
  ? fs
      .readFileSync(
        path.resolve(__dirname, "../contexts/AuthContextProvider.jsx"),
        "utf8"
      )
      .replaceAll(/(?:\r\n|\r|\n| )/g, "")
  : "";

const isPrivateRouteFileExists = fs.existsSync(
  path.resolve(__dirname, "../components/PrivateRoute.jsx"),
  "utf8"
);

const privateRouteFile = isPrivateRouteFileExists
  ? fs
      .readFileSync(
        path.resolve(__dirname, "../components/PrivateRoute.jsx"),
        "utf8"
      )
      .replaceAll(/(?:\r\n|\r|\n| )/g, "")
  : "";

const appFile = fs
  .readFileSync(path.resolve(__dirname, "../App.jsx"), "utf8")
  .replaceAll(/(?:\r\n|\r|\n| )/g, "");

const mainFile = fs
  .readFileSync(path.resolve(__dirname, "../main.jsx"), "utf8")
  .replaceAll(/(?:\r\n|\r|\n| )/g, "");

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  document.body.innerHTML = "";
});
beforeEach(() => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

test("contexts klasöründe AuthContextProvider.jsx isimli Context Provider Componenti dosyası oluşturulmuş mu?", () => {
  expect(isAuthContextFileExists).toBe(true);
});

test("AuthContextProvider.jsx dosyasında AuthContext isminde bir context oluşturulmuş mu?", () => {
  expect(authContextFile).toContain("createContext()");
});

test("AuthContextProvider.jsx dosyasında AuthContext.Provider tanımlanmış mı?", () => {
  expect(authContextFile).toContain("<AuthContext.Provider");
});

test("contexts klasöründe AuthContext Providera valuelar aktarılmış mı?", () => {
  expect(authContextFile).toContain("<AuthContext.Providervalue={");
});

test("App.jsx'de oluşturulan provider kullanılmış mı?", () => {
  expect(appFile).toContain("Provider>");
  expect(appFile.split("Provider>")).toHaveLength(3);
});

test("components klasöründe PrivateRoute.jsx isimli protected route componenti oluşturulmuş mu?", () => {
  expect(isPrivateRouteFileExists).toBe(true);
});

test("PrivateRoute.jsx dosyasında login sayfasına redirect kullanılmış mı?", () => {
  expect(privateRouteFile).toContain("<Redirect");
});

test("Oluşturulan protected route componenti App.jsx'de kullanılmış mı?", () => {
  expect(appFile).toContain("<PrivateRoute");
});

test("main.jsx'de routing için uygulama BrowserRouter ile sarmalanmış mı?", () => {
  expect(mainFile).toContain("BrowserRouter");
});

test("App.jsxde routelar eklenmiş mi?", () => {
  expect(appFile).toContain("<Route");
});

test("Sayfa ilk açıldığında, login sayfası çıkıyor ve header sadece login butonunu görünüyor mu?", async () => {
  screen.getAllByText("LOGIN");
  expect(screen.queryByText("LOGOUT")).toBe(null);
  expect(screen.queryByText("FRIENDS LIST")).toBe(null);
  expect(screen.queryByText("ADD FRIEND")).toBe(null);
});

test("Login formu submit edildiğinde login oluyor ve headerda FRIENDS LIST, ADD FRIEND butonu görünüyor mu?", async () => {
  const user = userEvent.setup();
  await user.type(await screen.findByPlaceholderText("Username"), "workintech");
  await user.type(await screen.findByPlaceholderText("Password"), "wecandoit");
  await user.click(await screen.findByText("SUBMIT"));
  await screen.findByText("ADD FRIEND");
  await screen.findAllByText("FRIENDS LIST");
});

test("Login olunca headerda logout butonu görünüyor ve login butonu kayboluyor mu?", async () => {
  expect(screen.queryByText("LOGIN")).toBe(null);
  await screen.findByText("LOGOUT");
});

test("Logout olunca login sayfası açılıyor mu?", async () => {
  const user = userEvent.setup();

  await user.click(await screen.findByText("LOGOUT"));
  await screen.findByText("SUBMIT");
});

test("FRIENDS LIST sayfasında isimler doğru formatta (isim - email) şeklinde görüntüleniyor mu?", async () => {
  const user = userEvent.setup();
  await user.type(await screen.findByPlaceholderText("Username"), "workintech");
  await user.type(await screen.findByPlaceholderText("Password"), "wecandoit");
  await user.click(await screen.findByText("SUBMIT"));
  await user.click(await screen.findAllByText("FRIENDS LIST")[0]);
  await screen.findByText(/Rachel Green/);
  await screen.findByText(/rachel@friends\.com/);
  await screen.findByText(/Joey Tribbiani/);
  await screen.findByText(/joey@friends\.com/);
});

test("Login bilgisi localStorageda code2work_s11d2 anahtarı ile tutuluyor mu?", async () => {
  const user = userEvent.setup();
  expect(isAuthContextFileExists).toBe(true);
  expect(isPrivateRouteFileExists).toBe(true);
  await user.click(await screen.findByText("LOGOUT"));
  localStorage.clear("code2work_s11d2");

  await user.type(await screen.findByPlaceholderText("Username"), "workintech");
  await user.type(await screen.findByPlaceholderText("Password"), "wecandoit");
  await user.click(await screen.findByText("SUBMIT"));
  const storedData = localStorage.getItem("code2work_s11d2") ?? "";
  expect(storedData.length).toBeGreaterThan(63);
});

test("Login bilgisi logout olunca localStoragedan siliniyor mu?", async () => {
  const user = userEvent.setup();
  expect(isAuthContextFileExists).toBe(true);
  expect(isPrivateRouteFileExists).toBe(true);
  await user.click(await screen.findByText("LOGOUT"));
  const storedData = localStorage.getItem("code2work_s11d2") ?? "";
  expect(storedData.length).not.toBeGreaterThan(63);
});
