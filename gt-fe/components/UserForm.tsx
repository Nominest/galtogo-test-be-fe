import AddUser from "./subcomponent/AddUser";

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
