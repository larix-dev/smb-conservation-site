const getStatusInfo = status => {
  const statusInfo = {
    NC: {label: 'Not Classified', class: 'text-stone-600'},
    LC: {label: 'Least Concern', class: 'text-green-600'},
    NT: {label: 'Near Threatened', class: 'text-lime-600'},
    VU: {label: 'Vulnerable', class: 'text-yellow-600'},
    EN: {label: 'Endangered', class: 'text-amber-600'},
    CE: {label: 'Critically Endangered', class: 'text-orange-600'},
    EW: {label: 'Extinct in the Wild', class: 'text-red-600'},
    EX: {label: 'Extinct', class: 'text-red-800'}
  }
  return statusInfo[status]
}

export {getStatusInfo}
