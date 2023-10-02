import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@nextui-org/react';
import { Image } from '@nextui-org/react';
import { AlertOctagon, HelpCircle } from 'lucide-react';

// Dummy Data

const productsList = [
  {
    id: "prod_NwdPnpqn",
    name: "Instaphrase Additional Credits",
    description: "Additional credits to be used for Instaphrase services.",
    images: [
      "https://files.stripe.com/links/MDB8YWNjdF8xTWpwejJMU1B2Rjh6Z0VRfGZsX3Rlc3RfMGFFODNTUTJINkFlWnR1SUdSbmpNRVRs00Ew88hTz4"
    ],
    active: false
  },
  {
    id: "prod_NwcWsdeC",
    name: "Instaphrase Monthly Subscription",
    description: "Monthly membership subscription to access Instaphrase services.",
    images: [
      "https://files.stripe.com/links/MDB8YWNjdF8xTWpwejJMU1B2Rjh6Z0VRfGZsX3Rlc3RfaFlXeHYwZmJVSTRCdmdWWFNLOXZDWHpn00KNMny4ya"
    ],
    active: true
  }
];

const ProductList = () => {
  return (
    <div className="grid xl:grid-cols-2 gap-4 container mx-auto">
      {productsList.map((product) => (
        <Card className="shadow-md mb-4">
          <CardHeader className="flex justify-between items-center p-4">
            <h2 className="font-bold text-lg">{product.name}</h2>
            {product.active ? (
              <HelpCircle className="text-green-500" />
            ) : (
              <AlertOctagon className="text-red-500" />
            )}
          </CardHeader>
          <CardBody fluid padding={0}>
            <Image width='100%' src={product.images[0]} alt={product.name}/>
            <p className="p-4">{product.description}</p>
          </CardBody>
          <CardFooter className="flex justify-end p-4">
            <Button auto color="primary">See More</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ProductList;