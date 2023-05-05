import withRoot from "../../hocs/WithRoute";
import InvoiceList from "./InvoiceList";

const CustomerInvoice = () => {
  return <InvoiceList invoices={[]}></InvoiceList>;
};

export default withRoot(CustomerInvoice);
