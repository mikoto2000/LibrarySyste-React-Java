import './App.css'
import { Link, Route, Routes } from 'react-router'
import { BookMastersPage } from './pages/bookmaster/BookMastersPage'
import { AuthorsPage } from './pages/author/AuthorsPage'
import { AuthorDetailPage } from './pages/author/AuthorDetailPage'
import { AuthorCreatePage } from './pages/author/AuthorCreatePage'
import { BookMasterCreatePage } from './pages/bookmaster/BookMasterCreatePage'
import { BookMasterDetailPage } from './pages/bookmaster/BookMasterDetailPage'
import { NdcCategoriesPage } from './pages/ndccategory/NdcCategoriesPage'
import { NdcCategoryCreatePage } from './pages/ndccategory/NdcCategoryCreatePage'
import { NdcCategoryDetailPage } from './pages/ndccategory/NdcCategoryDetailPage'
import { BookStockStatusesPage } from './pages/bookstockstatus/BookStockStatusesPage'
import { BookStockStatusDetailPage } from './pages/bookstockstatus/BookStockDetailPage'
import { BookStockStatusCreatePage } from './pages/bookstockstatus/BookStockStatusCreatePage'
import { BookStocksPage } from './pages/bookstock/BookStockPage'
import { BookStockDetailPage } from './pages/bookstock/BookStockDetailPage'
import { BookStockCreatePage } from './pages/bookstock/BookStockCreatePage'
import { CustomersPage } from './pages/customer/CustomersPage'
import { CustomerDetailPage } from './pages/customer/CustomerDetailPage'
import { CustomerCreatePage } from './pages/customer/CustomerCreatePage'
import { LendingStatusesPage } from './pages/lendingstatus/LendingStatusesPage'
import { LendingStatusDetailPage } from './pages/lendingstatus/LendingStatusDetailPage'
import { LendingStatusCreatePage } from './pages/lendingstatus/LendingStatusCreatePage'
import { LendingSetsPage } from './pages/lendingset/LendingSetsPage'
import { LendingSetCreatePage } from './pages/lendingset/LendingSetCreatePage'
import { LendingSetDetailPage } from './pages/lendingset/LendingSetDetailPage'
import { NdcCategoryEditPage } from './pages/ndccategory/NdcCategoryEditPage'
import { BookStockStatusEditPage } from './pages/bookstockstatus/BookStockStatusEditPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <ul>
          <li>マスタ管理
            <ul>
              <li><Link to="/ndcCategories">Ndc Categories</Link></li>
              <li><Link to="/bookStockStatuses">Book Stock Statuses</Link></li>
              <li><Link to="/lendingStatuses">Lending Statuses</Link></li>
            </ul>
          </li>
          <li>書籍・在庫管理
            <ul>
              <li><Link to="/authors">Authors</Link></li>
              <li><Link to="/bookMasters">Book Masters</Link></li>
            </ul>
          </li>
          <li>貸出管理
            <ul>
              <li><Link to="/bookStocks">Book Stocks</Link></li>
              <li><Link to="/customers">Customers</Link></li>
              <li><Link to="/lendingSets">Lending Sets</Link></li>
            </ul>
          </li>
        </ul>
      }
      />
      <Route path="/ndcCategories" element={
        <NdcCategoriesPage />
      }
      />
      <Route path="/ndcCategories/:id" element={
        <NdcCategoryDetailPage />
      }
      />
      <Route path="/ndcCategories/create" element={
        <NdcCategoryCreatePage />
      }
      />
      <Route path="/ndcCategories/:id/edit" element={
        <NdcCategoryEditPage />
      }
      />
      <Route path="/bookStockStatuses" element={
        <BookStockStatusesPage />
      }
      />
      <Route path="/bookStockStatuses/:id" element={
        <BookStockStatusDetailPage />
      }
      />
      <Route path="/bookStockStatuses/create" element={
        <BookStockStatusCreatePage />
      }
      />
      <Route path="/bookStockStatuses/:id/edit" element={
        <BookStockStatusEditPage />
      }
      />
      <Route path="/lendingStatuses" element={
        <LendingStatusesPage />
      }
      />
      <Route path="/lendingStatuses/:id" element={
        <LendingStatusDetailPage />
      }
      />
      <Route path="/lendingStatuses/create" element={
        <LendingStatusCreatePage />
      }
      />
      <Route path="/authors" element={
        <AuthorsPage />
      }
      />
      <Route path="/authors/:id" element={
        <AuthorDetailPage />
      }
      />
      <Route path="/authors/create" element={
        <AuthorCreatePage />
      }
      />
      <Route path="/bookMasters" element={
        <BookMastersPage />
      }
      />
      <Route path="/bookMasters/:id" element={
        <BookMasterDetailPage />
      }
      />
      <Route path="/bookMasters/create" element={
        <BookMasterCreatePage />
      }
      />
      <Route path="/bookStocks" element={
        <BookStocksPage />
      }
      />
      <Route path="/bookStocks/:id" element={
        <BookStockDetailPage />
      }
      />
      <Route path="/bookStocks/create" element={
        <BookStockCreatePage />
      }
      />
      <Route path="/customers" element={
        <CustomersPage />
      }
      />
      <Route path="/customers/:id" element={
        <CustomerDetailPage />
      }
      />
      <Route path="/customers/create" element={
        <CustomerCreatePage />
      }
      />
      <Route path="/lendingSets" element={
        <LendingSetsPage />
      }
      />
      <Route path="/lendingSets/:id" element={
        <LendingSetDetailPage />
      }
      />
      <Route path="/lendingSets/create" element={
        <LendingSetCreatePage />
      }
      />
    </Routes>
  )
}

export default App
