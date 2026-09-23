export const Profile = ({ user }) => {
  if (!user) {
    return (
      <div>
        <p className="text-red-500">
          Сиз авторизациядан өткөн жоксуз
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[43px]">
      <div>
        <img
          src={user.image}
          alt={user.name}
          className="w-[200px] h-[200px] object-cover rounded-full"
        />
      </div>

      <div>
        <h2 className="text-[14px] font-bold text-[#7B7B7B]">
          Профиль:
        </h2>

        <div className="mt-[5px]">
          <div>
            <p className="text-[10px] text-[#7B7B7B]">
              аты жөнү
            </p>

            <p className="text-[17px] font-semibold text-[#434343]">
              {user.name}
            </p>
          </div>

          <div>
            <p className="mt-[5px] text-[10px] text-[#7B7B7B]">
              электрондук почта
            </p>

            <p className="text-[17px] font-semibold text-[#434343]">
              {user.email}
            </p>
          </div>

          <div>
            <p className="leading-none mt-[5px] text-[10px] text-[#7B7B7B]">
              кызматтын аталышы
            </p>

            <p className="text-[17px] font-semibold text-[#434343]">
              {user.position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};