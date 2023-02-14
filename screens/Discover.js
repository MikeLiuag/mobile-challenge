import { View } from 'react-native'

import EmptyState from '../components/EmptyState'
import { containerStyles } from '../lib/styles'

export default function Discover({ navigation }) {
  return (
    <View style={containerStyles}>
      <EmptyState
        image={require('../assets/empty-discover.jpg')}
        title="No results found"
        message="Try adjusting the settings"
        actionLabel="Go to Settings"
        onAction={() => navigation.navigate('Settings')}
      />
    </View>
  )
}
