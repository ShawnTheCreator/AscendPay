import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Card, 
  Button, 
  Text, 
  Avatar, 
  Divider, 
  TextInput,
  Switch,
  List
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ProfileField = {
  label: string;
  value: string;
  icon: string;
  editable?: boolean;
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+27 82 123 4567',
    idNumber: '900101 1234 567',
    address: '123 Main St, Johannesburg, 2000'
  });

  const profileFields: ProfileField[] = [
    { label: 'Full Name', value: profileData.name, icon: 'account', editable: true },
    { label: 'Email', value: profileData.email, icon: 'email', editable: true },
    { label: 'Phone Number', value: profileData.phone, icon: 'phone', editable: true },
    { label: 'ID Number', value: profileData.idNumber, icon: 'card-account-details' },
    { label: 'Address', value: profileData.address, icon: 'home', editable: true },
  ];

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: keyof typeof profileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log('Profile saved:', profileData);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <Card style={styles.profileHeader}>
        <Card.Content style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Avatar.Icon 
              size={100}
              icon="account"
              style={styles.avatar}
              color="#20B2AA"
            />
            {isEditing && (
              <Button 
                mode="contained" 
                style={styles.editPhotoButton}
                icon="camera"
              >
                Change
              </Button>
            )}
          </View>
          <View style={styles.headerText}>
            <Text variant="titleLarge" style={styles.name}>
              {profileData.name}
            </Text>
            <Text variant="bodyMedium" style={styles.memberSince}>
              Member since Jan 2023
            </Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text variant="bodySmall" style={styles.ratingText}>
                4.8 (120 reviews)
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Edit/Save Button */}
      <View style={styles.editButtonContainer}>
        {isEditing ? (
          <Button 
            mode="contained" 
            onPress={handleSave}
            style={styles.saveButton}
            icon="content-save"
          >
            Save Profile
          </Button>
        ) : (
          <Button 
            mode="outlined" 
            onPress={handleEditToggle}
            style={styles.editButton}
            icon="pencil"
          >
            Edit Profile
          </Button>
        )}
      </View>

      {/* Profile Details */}
      <Card style={styles.detailsCard}>
        <Card.Content>
          {profileFields.map((field, index) => (
            <View key={field.label}>
              {isEditing && field.editable ? (
                <TextInput
                  label={field.label}
                  value={field.value}
                  onChangeText={(text) => 
                    handleInputChange(field.label.toLowerCase().replace(' ', '') as keyof typeof profileData, text)
                  }
                  mode="outlined"
                  left={<TextInput.Icon icon={field.icon} />}
                  style={styles.inputField}
                />
              ) : (
                <List.Item
                  title={field.value}
                  description={field.label}
                  left={props => <List.Icon {...props} icon={field.icon} />}
                  style={styles.listItem}
                />
              )}
              {index < profileFields.length - 1 && <Divider />}
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Settings Section */}
      <Card style={styles.settingsCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Account Settings
          </Text>
          
          <List.Item
            title="Dark Mode"
            description="Switch between light and dark theme"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch 
                value={darkMode} 
                onValueChange={() => setDarkMode(!darkMode)}
              />
            )}
          />
          <Divider />
          
          <List.Item
            title="Language"
            description="English"
            left={props => <List.Icon {...props} icon="translate" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          
          <List.Item
            title="Security"
            description="Change password, biometrics"
            left={props => <List.Icon {...props} icon="shield-lock" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          
          <List.Item
            title="Help & Support"
            description="FAQs, contact support"
            left={props => <List.Icon {...props} icon="help-circle" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card.Content>
      </Card>

      {/* Sign Out Button */}
      <Button 
        mode="contained-tonal" 
        style={styles.signOutButton}
        icon="logout"
        textColor="#FF3B30"
      >
        Sign Out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  profileHeader: {
    marginBottom: 16,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },
  editPhotoButton: {
    width: 100,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  memberSince: {
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
  editButtonContainer: {
    marginBottom: 16,
  },
  editButton: {
    borderColor: '#20B2AA',
  },
  saveButton: {
    backgroundColor: '#20B2AA',
  },
  detailsCard: {
    marginBottom: 16,
    elevation: 2,
  },
  listItem: {
    paddingVertical: 12,
  },
  inputField: {
    marginVertical: 8,
    backgroundColor: 'white',
  },
  settingsCard: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  signOutButton: {
    marginTop: 8,
    borderColor: '#FF3B30',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
});