"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { useNavigate, useLocation } from "react-router-dom";

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  // Open modal and update URL with product ID
  const handleOpenModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    searchParams.set("productId", product.id.toString());
    navigate({ search: searchParams.toString() }, { replace: true });
  }, [navigate, searchParams]);

  // Close modal and update URL to remove product ID
  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    searchParams.delete("productId");
    navigate({ search: searchParams.toString() }, { replace: true });
  }, [navigate, searchParams]);

  // On page load, check if a productId is present in the URL and open the modal
  useEffect(() => {
    const productId = searchParams.get("productId");
    if (productId) {
      const product = PRODUCTS_DATA.find((item) => item.id.toString() === productId);
      if (product) setSelectedProduct(product);
    }
  }, [searchParams]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
