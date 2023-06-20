import classes from "./Inbox.module.css";

function Inbox() {
  return (
    <>
      <div className={classes["no-messages"]}>
        <h1>You don't have any messages</h1>
      </div>
    </>
  );
}

export default Inbox;
