import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  async registerForPushNotifications() {
    if (!Device.isDevice) {
      console.log('Must use physical device for Push Notifications');
      return null;
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return null;
      }

      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }

      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;

      console.log('Push token:', token);
      await AsyncStorage.setItem('pushToken', token);
      return token;
    } catch (error) {
      console.error('Error registering for push notifications:', error);
      return null;
    }
  }

  async sendLocalNotification(title: string, body: string, data?: any) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
          sound: 'default',
          badge: 1,
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Error sending local notification:', error);
    }
  }

  async scheduleNotification(
    title: string,
    body: string,
    delaySeconds: number,
    data?: any
  ) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: data || {},
          sound: 'default',
          badge: 1,
        },
        trigger: {
          seconds: delaySeconds,
        },
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  async cancelAllNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling notifications:', error);
    }
  }

  // Notification types
  async notifyOrderConfirmed(orderNumber: string) {
    await this.sendLocalNotification(
      'Commande confirmée',
      `Votre commande #${orderNumber} a été confirmée`,
      { type: 'order_confirmed', orderNumber }
    );
  }

  async notifyOrderInPreparation(orderNumber: string) {
    await this.sendLocalNotification(
      'Commande en préparation',
      `Votre commande #${orderNumber} est en préparation`,
      { type: 'order_preparing', orderNumber }
    );
  }

  async notifyOrderInDelivery(orderNumber: string, driverName: string) {
    await this.sendLocalNotification(
      'Commande en livraison',
      `${driverName} est en route avec votre commande #${orderNumber}`,
      { type: 'order_in_delivery', orderNumber, driverName }
    );
  }

  async notifyOrderDelivered(orderNumber: string) {
    await this.sendLocalNotification(
      'Commande livrée',
      `Votre commande #${orderNumber} a été livrée`,
      { type: 'order_delivered', orderNumber }
    );
  }

  async notifyPrescriptionApproved(prescriptionName: string) {
    await this.sendLocalNotification(
      'Ordonnance approuvée',
      `Votre ordonnance "${prescriptionName}" a été approuvée`,
      { type: 'prescription_approved', prescriptionName }
    );
  }

  async notifyPrescriptionRejected(prescriptionName: string, reason: string) {
    await this.sendLocalNotification(
      'Ordonnance rejetée',
      `Votre ordonnance "${prescriptionName}" a été rejetée: ${reason}`,
      { type: 'prescription_rejected', prescriptionName, reason }
    );
  }

  async notifyLowStock(medicineName: string, quantity: number) {
    await this.sendLocalNotification(
      'Stock faible',
      `${medicineName}: ${quantity} unités restantes`,
      { type: 'low_stock', medicineName, quantity }
    );
  }

  async notifyExpiringMedicine(medicineName: string, expiryDate: string) {
    await this.sendLocalNotification(
      'Médicament expirant',
      `${medicineName} expire le ${expiryDate}`,
      { type: 'expiring_medicine', medicineName, expiryDate }
    );
  }

  async notifyNewOrder(orderNumber: string, customerName: string) {
    await this.sendLocalNotification(
      'Nouvelle commande',
      `Nouvelle commande #${orderNumber} de ${customerName}`,
      { type: 'new_order', orderNumber, customerName }
    );
  }

  async notifySubscriptionExpiring(daysLeft: number) {
    await this.sendLocalNotification(
      'Abonnement expire bientôt',
      `Votre abonnement expire dans ${daysLeft} jours`,
      { type: 'subscription_expiring', daysLeft }
    );
  }

  async notifySubscriptionExpired() {
    await this.sendLocalNotification(
      'Abonnement expiré',
      'Votre abonnement a expiré. Veuillez le renouveler pour continuer.',
      { type: 'subscription_expired' }
    );
  }

  // Listen to notifications
  setupNotificationListeners(onNotificationReceived: (notification: any) => void) {
    // When a notification is received
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
      onNotificationReceived(notification);
    });

    // When a user taps on a notification
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);
      const data = response.notification.request.content.data;
      // Handle navigation based on notification type
      this.handleNotificationTap(data);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }

  private handleNotificationTap(data: any) {
    switch (data.type) {
      case 'order_confirmed':
      case 'order_preparing':
      case 'order_in_delivery':
      case 'order_delivered':
        console.log('Navigate to order:', data.orderNumber);
        // Navigation will be handled by the app
        break;
      case 'prescription_approved':
      case 'prescription_rejected':
        console.log('Navigate to prescriptions');
        break;
      case 'new_order':
        console.log('Navigate to orders');
        break;
      case 'subscription_expiring':
      case 'subscription_expired':
        console.log('Navigate to subscription');
        break;
      default:
        console.log('Unknown notification type:', data.type);
    }
  }
}

export const notificationService = new NotificationService();
