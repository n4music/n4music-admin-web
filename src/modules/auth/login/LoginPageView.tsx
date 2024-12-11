"use client";
import GeneralLoading from "@/components/base/GeneralLoading";
import { DEFINE_ROUTE } from "@/constants/router";
import cookiesStore from "@/plugins/cookiesStore";
import { AuthService } from "@/services/auth/AuthService";
import { Input, message } from "antd";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function LoginPageView() {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onHandleSubmit = async () => {
    if (!(form.email && form.password)) {
      message.error("Please enter user name and password");
      return;
    }
    try {
      setLoading(true);
      const rs = await AuthService.login(form.email, form.password);
      cookiesStore.set("token", rs.data.token);
      router.push(DEFINE_ROUTE.home);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GeneralLoading isLoading={loading} />
      <div className="flex h-screen w-full justify-center items-center">
        <section className="h-full">
          <div className="container h-full p-10">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 ">
              <div className="w-full">
                <div className="block rounded-xl bg-black shadow-xl">
                  <div className="g-0 lg:flex lg:flex-wrap">
                    <div className="px-4 md:px-0 lg:w-full">
                      <div className="md:mx-6 md:p-12">
                        {/* <!--Logo--> */}
                        <div className="text-center">
                          <h2 className="mb-6 mt-1 pb-1 text-2xl font-semibold text-white">
                            Admin of Music App
                          </h2>
                        </div>

                        <form className="space-y-2">
                          <p className="text-md font-medium text-white">Please login to your account</p>
                          {/* <!--email input--> */}
                          <Input
                            type="text"
                            size="large"
                            placeholder="Email"
                            className="mb-4"
                            value={form.email}
                            onChange={(e) => {
                              setForm((pre) => ({
                                ...pre,
                                email: e.target.value,
                              }));
                            }}
                          ></Input>
                          <Input.Password
                            type="password"
                            size="large"
                            placeholder="Password"
                            className="mb-4"
                            value={form.password}
                            onChange={(e: any) => {
                              setForm((pre) => ({
                                ...pre,
                                password: e.target.value,
                              }));
                            }}
                          ></Input.Password>
                          <div className="mb-12 pb-1 pt-1 text-center">
                            <button
                              disabled={loading}
                              className="mb-3 bg-pink-900 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-0px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="button"
                              onClick={() => onHandleSubmit()}
                            >
                              Đăng nhập
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
