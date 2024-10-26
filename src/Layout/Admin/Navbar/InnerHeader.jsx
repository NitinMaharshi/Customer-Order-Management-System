import BreadCrumbs from '../../pages/common/BreadCrumbs';

const InnerHeader = ({ title, data }) => (
  <div className='flex justify-between'>
    <h5 className="font-bold mb-3 uppercase dark:text-slate-300 text-title">{title}</h5>
    <BreadCrumbs data={data} />
  </div>
);
export default InnerHeader;