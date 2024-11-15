import { useNavigate } from 'react-router-dom';
import './crt.css';
import './styles.css';

export const Bsod = () => {
  const navigate = useNavigate();
  return (
    <div className="crt">
      <div className="bsod-container">
        <p>A problem has been detected and windows has been shutdown to prevent damage to your computer.</p>
        <p>DRIVER_IRQL_NOT_LES_OR_EQ</p>
        <p>
          If this is the first time you’ve seen this stop error screen, restart your computer, If this screen appears
          again, follow these steps:
        </p>
        <p>
          Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your
          hardware or software manufacturer for any windows updates you might need.
        </p>
        <p>
          If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options
          such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your
          computer, press F8 to select Advanced Startup Options, and then select Safe Mode.
        </p>
        <p>Technical information:</p>
        <p>*** STOP: 0x000000D1 (0x0000000C,0x00000002,0x00000 000,0xF86B5A89)</p>
        <p>*** gv3.sys – Address F86B5A89 base at F86B5000, DateStamp 3dd9919eb</p>
        <p>
          Beginning dump of physical memory…
          <br />
          Physical memory dump complete.
        </p>
      </div>

      <button onClick={() => navigate({ pathname: '/', search: 'n=1' }, { replace: true })}>Return</button>
    </div>
  );
};
