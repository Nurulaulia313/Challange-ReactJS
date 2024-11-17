import { useState, useEffect } from "react";
import getAllProducts from "../../services/getAllProducts";
import CardList from "../../components/CardList/CardList";
import Navbar from "../../components/Navbar/Navbar";
import RadioButton from "../../components/RadioButton/RadioButton";

export default function ProductPage() {
  const [products, setProducts] = useState([]); // Semua produk
  const [filteredProducts, setFilteredProducts] = useState([]); // Produk yang difilter
  const [selectedCategory, setSelectedCategory] = useState("all"); // Kategori yang dipilih
  const [searchTerm, setSearchTerm] = useState(""); // Kata kunci pencarian

  // Ambil semua produk saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getAllProducts(); // Pastikan getAllProducts() mengembalikan promise
      setProducts(allProducts);
      setFilteredProducts(allProducts); // Default: tampilkan semua produk
    };

    fetchProducts();
  }, []);

  // Fungsi untuk menyaring produk berdasarkan kategori dan pencarian
  const filterProducts = (category, term) => {
    let filtered = products;

    // Filter berdasarkan kategori
    if (category === "raket") {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes("raket")
      );
    } else if (category === "shuttlecock") {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes("shuttlecock")
      );
    }

    // Filter berdasarkan pencarian (jika ada)
    if (term) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredProducts(filtered); // Update produk yang ditampilkan
  };

  // Fungsi untuk menangani perubahan kategori
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, searchTerm); // Filter berdasarkan kategori
  };

  // Fungsi untuk menangani pencarian
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    filterProducts(selectedCategory, term); // Filter berdasarkan pencarian
  };

  const RadioButtonOpts = [
    { label: "All", value: "all" },
    { label: "Raket", value: "raket" },
    { label: "Shuttlecock", value: "shuttlecock" },
  ];

  return (
    <>
      {/* Navbar dengan Search Bar */}
      <Navbar onSearchChange={handleSearchChange} />

      {/* Filter Kategori */}
      <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          {/* Radio Button untuk kategori */}
          <RadioButton
            options={RadioButtonOpts}
            defaultValue={selectedCategory} // Pastikan nilai default sesuai dengan kategori yang dipilih
            onChange={handleCategoryChange} // Tangani perubahan kategori
          />
        </div>
      </div>

      {/* Daftar Produk */}
      <section className="container px-24 py-4">
        <main className="grid grid-cols-4 gap-4">
          {/* Gunakan produk yang sudah difilter */}
          <CardList products={filteredProducts} />
        </main>
      </section>
    </>
  );
}