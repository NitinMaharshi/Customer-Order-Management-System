const Footer = ({ className = 'custom-class' }) => (
  <footer className={className + ' ' + 'static'}>
    <div className="site-footer px-6 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 py-4">
      <div className="text-center ltr:md:text-center rtl:md:text-right text-sm">
        COPYRIGHT &copy; {new Date().getFullYear()} Connect ride, All rights Reserved
      </div>
    </div>
  </footer>
);

export default Footer;
