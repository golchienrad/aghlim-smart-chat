import { MapPin, Bookmark } from 'lucide-react';
import { Advertisement } from '../types/types';
import { advertiseStyles } from '../utils/styles';
import { PLACEHOLDER_IMAGE } from '../hooks/constants';

interface AdvertiseDetailsProps {
  advertisement: Advertisement;
}

const AdvertiseDetails: React.FC<AdvertiseDetailsProps> = ({ advertisement }) => {
  let specs: any[] = [];
  try {
    specs = JSON.parse(advertisement.Specification || '[]');
  } catch (error) {
    console.error('Invalid Specification JSON:', error);
  }

  const getSpecValue = (name: string, defaultValue = 'نامشخص') =>
    specs.find((spec) => spec.SpecificationName === name)?.Value || defaultValue;
  const hasFeature = (name: string) => getSpecValue(name, '0') === '1' ? 'دارد' : 'ندارد';

  const area = getSpecValue('متراژ');
  const rooms = getSpecValue('تعداد اتاق');
  const buildYear = getSpecValue('سال ساخت');
  const floor = getSpecValue('طبقه وقوع ملک');
  const totalFloors = getSpecValue('تعداد طبقات');
  const rent = getSpecValue('اجاره بها ماهیانه');
  const deposit = getSpecValue('قیمت ودیعه(رهن)');
  const hasElevator = hasFeature('آسانسور');
  const hasParking = hasFeature('پارکینگ');
  const hasStorage = hasFeature('انباری');

  return (
    <div className={advertiseStyles.card}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className={advertiseStyles.title}>{advertisement.Title}</h2>
          <p className={advertiseStyles.subtitle}>
            {advertisement.AdvertiseGroupName} در {advertisement.WHERE_Value}
          </p>
        </div>
        <button className={advertiseStyles.actionButton} aria-label="ذخیره آگهی">
          <Bookmark size={20} />
        </button>
      </div>
      <p className={advertiseStyles.description}>{advertisement.Description}</p>
      <div className={advertiseStyles.specGrid}>
        <div>متراژ: {area} متر</div>
        <div>تعداد اتاق: {rooms}</div>
        <div>سال ساخت: {buildYear}</div>
        <div>طبقه: {floor} از {totalFloors}</div>
        <div>اجاره ماهیانه: {rent} میلیون تومان</div>
        <div>ودیعه: {deposit} تومان</div>
        <div>آسانسور: {hasElevator}</div>
        <div>پارکینگ: {hasParking}</div>
        <div>انباری: {hasStorage}</div>
      </div>
      <div className={advertiseStyles.imageSection}>
        <h3 className={advertiseStyles.imageTitle}>تصاویر</h3>
        <div className={advertiseStyles.imageGrid}>
          {advertisement.Images && advertisement.Images.length > 0 ? (
            advertisement.Images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`تصویر ${index + 1}`}
                className={advertiseStyles.image}
                onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
              />
            ))
          ) : (
            <p className={advertiseStyles.noImage}>تصویری موجود نیست</p>
          )}
        </div>
      </div>
      <div className={advertiseStyles.footer}>
        <p className={advertiseStyles.meta}>
          تاریخ ثبت: {new Date(advertisement.CreatedDatetime).toLocaleDateString('fa-IR')}
        </p>
        <p className={advertiseStyles.meta}>کد آگهی: {advertisement.advertiseCode}</p>
        <button className={advertiseStyles.mapButton} aria-label="نمایش روی نقشه">
          <MapPin size={16} className="ml-1" />
          نمایش روی نقشه
        </button>
      </div>
    </div>
  );
};

export default AdvertiseDetails;