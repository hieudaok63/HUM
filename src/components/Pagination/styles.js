const styles = (theme) => ({
  paginationContainer: {
    height: '100%',
    position: 'relative',
    background: theme.content.backgroundColor
  },
  coverPaginationContainer: {
    height: '100%',
    position: 'relative',
    background: theme.content.coverBackgroundColor
  },
  paginationControls: {
    position: 'absolute',
    bottom: 32,
    padding: 6,
    zIndex: 99
  },
  currentPageAndIndex: {
    background: 'rgba(71, 71, 71, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: 48,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 6,
    width: 85,
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    cursor: 'pointer'
  },
  icon: {
    color: 'white',
    fontSize: 20
  },
  prevPage: {
    background: 'rgba(71, 71, 71, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: 48,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 6,
    position: 'absolute',
    margin: 'auto',
    left: 6,
    cursor: 'pointer'
  },
  nextPage: {
    background: 'rgba(71, 71, 71, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: 48,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 6,
    position: 'absolute',
    margin: 'auto',
    right: 6,
    cursor: 'pointer'
  }
});

export default styles;
