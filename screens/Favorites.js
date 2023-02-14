import { View } from 'react-native'
import EmptyState from '../components/EmptyState'
import { containerStyles } from '../lib/styles'

export default function Favorites({ navigation }) {
  return (
    <View style={containerStyles}>
      <EmptyState
        image={require('../assets/empty-favorites.jpg')}
        title="You haven't liked any movie yet"
        message="Why not try to find a movie you like?"
        actionLabel="Go to Discover"
        onAction={() => navigation.navigate('Discover')}
      />
    </View>
  )
}
