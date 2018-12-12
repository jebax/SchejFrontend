export const setAuthStorage = data => {
  localStorage['name'] = data.name
  localStorage['organisation'] = data.organisation
  localStorage['email'] = data.email
  localStorage['id'] = data.id
  localStorage['mobile'] = data.mobile
  localStorage['authenticationToken'] = data.authentication_token
}
