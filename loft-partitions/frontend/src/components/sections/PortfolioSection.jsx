import React from 'react';
import { usePortfolio } from '../../hooks/useApi';
import LoadingSpinner from '../ui/LoadingSpinner';

const PortfolioSection = () => {
  const { data: projects, loading, error } = usePortfolio({ limit: 3 });

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">
            Наши Работы
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Реализованные проекты, которые вдохновляют
          </p>
        </div>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="text-center text-red-600 py-8">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {project.main_image ? (
                    <img
                      src={project.main_image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <div className="text-4xl mb-2">📸</div>
                      <p>Фото проекта</p>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-dark mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.project_type} • {project.area} м²
                  </p>
                  <button className="btn-secondary w-full text-sm py-2">
                    Смотреть проект
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;