import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import { useAuth } from 'src/auth/context/users/auth-context';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  // tour: icon('ic_tour'),
  tour: icon('ic_calendar'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  // booking: icon('ic_booking'),
  booking: icon('ic_invoice'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();
  const { user, refreshToken } = useAuth();
  const roles = ['companyAdmin', 'superAdmin'];

  const data = useMemo(
    () => [
      {
        subheader: t('overview'),
        show: true,
        items: [
          {
            title: t('Dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.booking,
          },
          {
            title: t('CompanyEvents'),
            path: paths.dashboard.companyEvents.root,
            icon: ICONS.tour,
            show: user?.role === 'companyAdmin',
            children: [
              { title: t('list'), path: paths.dashboard.companyEvents.root },
            ],
          },
          {
            title: t('Customers'),
            path: paths.dashboard.companyCustomers.root,
            icon: ICONS.user,
            show: user?.role === 'companyAdmin',
            children: [
              { title: t('list'), path: paths.dashboard.companyCustomers.root },
            ],
          },
          {
            title: t('Events'),
            path: paths.dashboard.tour.root,
            icon: ICONS.tour,
            show: user?.role === 'superAdmin',
            children: [
              { title: t('list'), path: paths.dashboard.tour.root },
              { title: t('create'), path: paths.dashboard.tour.new },
            ],
          },
          {
            title: t('users'),
            path: paths.dashboard.user.list,
            icon: ICONS.tour,
            show: user?.role === 'superAdmin',
            children: [
              { title: t('list'), path: paths.dashboard.user.list },
              { title: t('create'), path: paths.dashboard.user.new },
            ],
          },
          {
            title: t('Artists'),
            path: paths.dashboard.artist.list,
            icon: ICONS.tour,
            show: user?.role === 'superAdmin',
            children: [
              { title: t('list'), path: paths.dashboard.artist.list },
              { title: t('create'), path: paths.dashboard.artist.new },
            ],
          },
          {
            title: t('Venues'),
            path: paths.dashboard.venue.list,
            icon: ICONS.tour,
            show: user?.role === 'superAdmin',
            children: [
              { title: t('list'), path: paths.dashboard.venue.list },
              { title: t('create'), path: paths.dashboard.venue.new },
            ],
          },
        ],
      },
      // {
      //   subheader: 'administration',
      //   show: user?.role === 'superAdmin',
      //   items: [
      //     {
      //       title: 'all events',
      //       path: paths.dashboard.general.booking,
      //       icon: ICONS.booking,
      //     },
      //     {
      //       title: 'companies',
      //       path: paths.dashboard.user.list,
      //       icon: ICONS.booking,
      //     },
      //   ],
      // },
    ],
    [t]
  );

  return data;
}
