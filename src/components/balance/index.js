import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deposit, withdraw } from "../../features/balance/balanceSlice";
import Toast from "../toast";
import { show } from "../../features/toast/toastSlice";

const Balance = () => {
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  const handleDeposit = () => {
    dispatch(deposit(10));
  };
  const handleWithdraw = () => {
    dispatch(withdraw(10));
  };

  const handleShowToast = () => {
    dispatch(show({ message: "Pesan kesalahan", severity: "error" }));
  };

  return (
    <>
      <Toast />
      <section>
        <h2>Total Saldo</h2>
        <p>$ {balance.total}</p>
      </section>
      <section>
        <button type="button" onClick={handleDeposit}>
          Deposit $10
        </button>
        <button type="button" onClick={handleWithdraw}>
          Withdraw $10
        </button>
        <button type="button" onClick={handleShowToast}>
          Show Toast
        </button>
      </section>
    </>
  );
};
export default Balance;
