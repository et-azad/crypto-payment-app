
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSetting } from "@/store/slices/setting";
import { SettingOptions } from "@/components/models/setting";

export default function SyncData() {
  const dispatch = useDispatch();

  useEffect(() => {
    const setting: SettingOptions = JSON.parse(localStorage.getItem("_settings") || "{}");
    if (Object.keys(setting).length !== 0) dispatch(updateSetting({
      status: true,
      options: setting
    }))
  })
  return <></>
}