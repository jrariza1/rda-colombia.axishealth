import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getRouterEndpoint(agentId: string): Promise<string> {
  const SALES_ROUTER = "/api/sales/v1/chat";
  const DEFAULT_ENDPOINT = "/api/orchestrator/message";

  try {
    const agentRef = doc(db, "aiAgents", agentId);
    const agentSnap = await getDoc(agentRef);

    if (agentSnap.exists()) {
      const agentData = agentSnap.data();
      const routerMap = agentData.router_map || {};
      const activeCaps = agentData.activeCapabilities || agentData.allowedCapabilities || [];

      if (activeCaps.length > 0) {
        for (const cap of activeCaps) {
          if (routerMap[cap]) return routerMap[cap];
        }
      }
      return DEFAULT_ENDPOINT;
    }
    return SALES_ROUTER;
  } catch (error: any) {
    if (error.code === 'permission-denied') return SALES_ROUTER;
    return SALES_ROUTER;
  }
}

export async function getPanelForTool(agentId: string, toolId: string, status: string = 'success'): Promise<string | null> {
  try {
    const agentRef = doc(db, "aiAgents", agentId);
    const agentSnap = await getDoc(agentRef);
    if (!agentSnap.exists()) return null;
    const uiMap = agentSnap.data().ui_map || {};
    return uiMap[toolId] || null;
  } catch (error) {
    return null;
  }
}
