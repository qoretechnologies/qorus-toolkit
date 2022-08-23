"use strict";

import QorusToolkit from "../lib/QorusToolkit";
import MockAdapter from "axios-mock-adapter";
import httpsAxios from "../utils/httpsAxios";
import logger from "../lib/logger";

describe("QorusToolkit Utility Class Tests", () => {
  let mock: MockAdapter;
  const qorus = new QorusToolkit();

  beforeAll(() => {
    mock = new MockAdapter(httpsAxios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("When authentication is successful", () => {
    it("Should return user token after authentication", async () => {
      const usrToken = "336d9306-3b70-41df-9427-c051d25886b2";
      mock
        .onPost(
          "https://hq.qoretechnologies.com:31011/api/latest/public/login",
          {
            user: "rmalik",
            pass: "yzu2d8smRoCetW8",
          }
        )
        .reply(200, usrToken);

      let result;
      try {
        result = await qorus.login({
          url: "https://hq.qoretechnologies.com:31011/api/latest/public/login",
          user: "rmalik",
          pass: "yzu2d8smRoCetW8",
        });
      } catch (error: any) {
        logger.error(`${error.code} ${error.message}`);
      }

      expect(mock.history.post[0].data).not.toBeNull();
      expect(result).toEqual(usrToken);
    });

    it("should return the current auth config", () => {
      const config = qorus.getConfig();

      expect(config).toEqual(
        "https://hq.qoretechnologies.com:31011/api/latest/public/login"
      );
    });

    it("Should return current user token if the user is authenticated", () => {
      expect(qorus.getUserToken()).not.toBeNull();
    });

    it("Should change the config", () => {
      qorus.config("https://www.google.com");

      expect(qorus.getConfig()).toEqual("https://www.google.com");
    });

    it("Should logout the user", () => {
      qorus.logout();

      expect(qorus.getUserToken()).toEqual(null);
    });
  });

  describe("When authentication is not successful", () => {
    it("Should return error if the user can't sign in", async () => {
      let err = { message: "", code: "" };
      try {
        await qorus.login({ user: "bob", pass: "lsjdfkl" });
      } catch (error: any) {
        err.message = error.message;
      }

      expect(err.message).toContain("Couldn't sign in user,");
    });
  });
});