import Link from "next/link";

export default async function Page() {
  const products = await fetch("http://localhost:3000/api/products").then(
    (res) => res.json(),
  );
  const users = await fetch("http://localhost:3000/api/user").then((res) =>
    res.json(),
  );
  console.log(users);
  console.log(products);
  return (
    <>
      <div>Hi wellcome to shop </div>
      {/* <div> */}
      {/*   {products.map((product) => ( */}
      {/*     <div key={product.id}> */}
      {/*       <h2>{product.name}</h2> */}
      {/*       <p>{product.description}</p> */}
      {/*       <p>Price: ${product.price}</p> */}
      {/*       <p>Stock: {product.stock}</p> */}
      {/*       <p> */}
      {/*         Created at: {new Date(product.createdAt).toLocaleDateString()} */}
      {/*       </p> */}
      {/*     </div> */}
      {/*   ))} */}
      {/* </div> */}
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
      <Link href="/shop/products">Products</Link>
    </>
  );
}
