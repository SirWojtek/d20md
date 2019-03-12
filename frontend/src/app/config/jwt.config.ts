
export function tokenGetter() {
  return localStorage.getItem('id_token');
}

export const whitelistedDomains = [
  'localhost:3000',
  'd20md.com'
];

export const blacklistedRoutes = [
  'localhost:3000/api/public/',
  'localhost:3000/api/user/',
  'd20md.com/api/public/',
  'd20md.com/api/user/',
];
