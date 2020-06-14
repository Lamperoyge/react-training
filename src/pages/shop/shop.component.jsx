import React, { useState } from "react";
import { SHOP_DATA } from "./shop.data";
import CollectionPreview from "../../components/preview-collection/preview-collection.component";
const ShopPage = () => {
  const [collections, setCollections] = useState(SHOP_DATA);
  return (
    <div className="shop-page">
      {collections.map(({ id, ...collectionProps }) => {
        return <CollectionPreview key={id} {...collectionProps} />;
      })}
    </div>
  );
};

export default ShopPage;
