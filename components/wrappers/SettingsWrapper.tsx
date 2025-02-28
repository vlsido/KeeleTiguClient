import SettingsMenu from "../settings/SettingsMenu";

interface SettingsWrapperProps {
  children: React.ReactNode
}

function SettingsWrapper(props: SettingsWrapperProps) {

  return (
    <>
      <SettingsMenu />
      {props.children}
    </>
  );
}

export default SettingsWrapper;
