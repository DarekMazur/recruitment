export const getInitials = (user: string) => {
  const initials: string[] = [];
  if (user.length > 0) {
    const name = user.substring(0, user.indexOf('@'));
    for (let i = 0; i < name.split('.').length; i++) {
      initials.push(name.split('.')[i][0].toUpperCase());
    }
  }

  return initials.join('');
};
