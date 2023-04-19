import AddUser from "./subcomponent/AddUser";
// import UpdateUser from "./subcomponent/UpdateUser";

export default function UserForm(): JSX.Element {
  const flag = false;

  return (
    <div>
      <div className="container-mx-auto py-5">
        {/* {flag ? <AddUser /> : <UpdateUser />}
         */}
        <AddUser />
      </div>
    </div>
  );
}
