import { toast } from "react-toastify";

type BrowserNotificationPayload = {
  title: string;
  body: string;
  tag?: string;
  icon?: string;
};

export type BrowserNotificationStatus =
  | "granted"
  | "denied"
  | "default"
  | "unsupported"
  | "not_logged_in";

const STORAGE_KEY = "persist:root";

const isNotificationSupported = () => {
  return typeof window !== "undefined" && "Notification" in window;
};

const getAuthTokenFromStorage = (showToast = false) => {
  try {
    if (showToast) {
      toast.info("Checking login session...");
    }

    const persist = localStorage.getItem(STORAGE_KEY);

    if (!persist) {
      if (showToast) {
        toast.error("Login session not found");
      }

      return null;
    }

    const parsed = JSON.parse(persist);

    const auth =
      typeof parsed.auth === "string" ? JSON.parse(parsed.auth) : parsed.auth;

    const token = auth?.token || null;

    if (!token) {
      if (showToast) {
        toast.error("Token not found. Please login again.");
      }

      return null;
    }

    if (showToast) {
      toast.success("Login session verified");
    }

    return token;
  } catch (error) {
    console.error("Failed to read token", error);

    if (showToast) {
      toast.error("Failed to read login session");
    }

    return null;
  }
};

const createNativeNotification = ({
  title,
  body,
  tag,
  icon = "/favicon.ico",
}: BrowserNotificationPayload) => {
  const notification = new Notification(title, {
    body,
    icon,
    tag,
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };
};

export const isUserLoggedIn = () => {
  return Boolean(getAuthTokenFromStorage());
};

export const requestBrowserNotificationPermission =
  async (): Promise<BrowserNotificationStatus> => {
    const token = getAuthTokenFromStorage(true);

    if (!token) {
      return "not_logged_in";
    }

    if (!isNotificationSupported()) {
      toast.error("This browser does not support notifications");

      return "unsupported";
    }

    if (Notification.permission === "granted") {
      toast.success("Browser notifications are already ON");

      createNativeNotification({
        title: "BedWatch Notifications",
        body: "Notifications are already enabled for transfer updates.",
        tag: "notification-already-enabled",
      });

      return "granted";
    }

    if (Notification.permission === "denied") {
      toast.error(
        "Browser notifications are OFF. Enable them from browser site settings.",
      );

      return "denied";
    }

    toast.info("Please allow notifications in the browser popup");

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      toast.success("Browser notifications turned ON");

      createNativeNotification({
        title: "BedWatch Notifications Enabled",
        body: "You will receive transfer approval and rejection notifications.",
        tag: "notification-enabled",
      });

      return "granted";
    }

    if (permission === "denied") {
      toast.error("Browser notifications were blocked");

      return "denied";
    }

    toast.warning("Browser notifications are still OFF");

    return "default";
  };

export const showBrowserNotification = async ({
  title,
  body,
  tag,
  icon = "/favicon.ico",
}: BrowserNotificationPayload): Promise<BrowserNotificationStatus> => {
  const token = getAuthTokenFromStorage();

  if (!token) {
    return "not_logged_in";
  }

  if (!isNotificationSupported()) {
    return "unsupported";
  }

  if (Notification.permission !== "granted") {
    return Notification.permission;
  }

  createNativeNotification({
    title,
    body,
    tag,
    icon,
  });

  return "granted";
};
